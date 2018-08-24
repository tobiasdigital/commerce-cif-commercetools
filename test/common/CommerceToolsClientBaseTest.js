/*******************************************************************************
 *
 *    Copyright 2018 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/

'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const setup = require('../lib/setupTest').setup;
const config = require('../lib/config').config;

const CommerceToolsClientBase = require('../../src/common/CommerceToolsClientBase');

describe('CommerceTools Common CommerceToolsClientBase', () => {

    describe('Unit tests', () => {

        // Add helpers to context
        setup(this, __dirname, 'CommerceToolsClientBase');

        let argsConfig = {
            CT_AUTH_HOST: config.CT_AUTH_HOST,
            CT_PROJECTKEY: config.CT_PROJECTKEY,
            CT_CLIENTID: config.CT_CLIENTID,
            CT_CLIENTSECRET: config.CT_CLIENTSECRET
        }

        let argsDebug = {
            DEBUG: 1
        };

        let createClient = null;

        before(() => {
            createClient = require('@commercetools/sdk-client').createClient;
        });

        it('returns the activation id in debug mode', () => {
            let id = 'testId';
            process.env.__OW_ACTIVATION_ID = id;

            let clientBase = new CommerceToolsClientBase(Object.assign({}, argsConfig, argsDebug), createClient);

            return clientBase._handleSuccess("", {}).then((res) => {
                assert.isDefined(res.response.headers);
                assert.isDefined(res.response.headers['OW-Activation-Id']);
                assert.equal(res.response.headers['OW-Activation-Id'], id);
            });
        });

        it('profiles a successful request', () => {
            let sampleOutput = 'sampleOutput';
            let clientBase = new CommerceToolsClientBase(Object.assign({}, argsConfig, argsDebug), createClient);
            
            let spy = sinon.spy(clientBase, '_logRequest');
            this.prepareResolve(sampleOutput);

            return clientBase._profileRequest({uri: 'test', method: 'GET'}).then((res) => {
                assert.equal(res, sampleOutput);
                assert.isTrue(spy.calledOnce);
            });
        });

        it('profiles a failing request', () => {
            let sampleOutput = 'sampleOutput';
            let clientBase = new CommerceToolsClientBase(Object.assign({}, argsConfig, argsDebug), createClient);
            let spy = sinon.spy(clientBase, '_logRequest');
            this.prepareReject(sampleOutput);

            return clientBase._profileRequest({})
                .then(() => {
                    assert.fail();
                })
                .catch((res) => {
                    assert.equal(res, sampleOutput);
                    assert.isTrue(spy.calledOnce);
                });
        });

        it('profiles requests only in debug mode', () => {
            let clientBase = new CommerceToolsClientBase(Object.assign({}, argsConfig, argsDebug), createClient);
            let sampleOutput = 'sampleOutput';
            this.prepareResolve(sampleOutput);

            let spy = sinon.spy(clientBase, '_profileRequest');

            return clientBase._execute().then((res) => {
                assert.equal(res, sampleOutput);
                assert.isTrue(spy.calledOnce);
            });
        });

        it('does not profile requests if not in debug mode', () => {
            let clientBase = new CommerceToolsClientBase(Object.assign({}, argsConfig), createClient);
            let sampleOutput = 'sampleOutput';
            this.prepareResolve(sampleOutput);

            let spy = sinon.spy(clientBase, '_profileRequest');

            return clientBase._execute().then((res) => {
                assert.equal(res, sampleOutput);
                assert.isTrue(spy.notCalled);
            });
        });

    });
});