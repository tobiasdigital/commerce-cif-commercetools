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

const mockRequire = require('mock-require');
const sinon = require('sinon');
const utils = require('./utils');
const config = require('../lib/config').config;
const assert = require('chai').assert;

/**
 * function constructor for commerce tools test context based on mocha described context
 */

module.exports.setup = function (ctx, testDirName, actionName) {
    //private members
    let client = null;
    let action = null;
    let args = null;

    beforeEach(() => {
        args = {
            __ow_headers: {},
            CT_AUTH_HOST: config.CT_AUTH_HOST,
            CT_PROJECTKEY: config.CT_PROJECTKEY,
            CT_CLIENTID: config.CT_CLIENTID,
            CT_CLIENTSECRET: config.CT_CLIENTSECRET
        };
    });

    afterEach(() => {
        client.execute.reset();
    });

    before(() => {
        client = {
            execute: () => undefined
        };
        sinon.stub(client, 'execute');

        mockRequire('@commercetools/sdk-client', {
            createClient: () => client
        });

        mockRequire('@commercetools/sdk-middleware-auth', {
            createAuthMiddlewareForAnonymousSessionFlow: () => sinon.stub().returns({}),
            createAuthMiddlewareForPasswordFlow: () => sinon.stub().returns({})
        });

        mockRequire('@commercetools/sdk-middleware-http', {
            createHttpMiddleware: () => sinon.stub().returns({})
        });

        action = ctx.requireUncached(utils.getPathForAction(testDirName, actionName)).main;
    });

    ctx.execute = function (params) {
        let name;
        for (name in params) {
            if (typeof params[name] !== 'function') {
                args[name] = params[name];
            }
        }
        return action(args).then(result => {
            return Promise.resolve(result);
        });
    };

    //stub for ct sdk client execute with promise resolve
    ctx.prepareResolve = function (mockedResponse, expectedArgs) {
        client.execute.callsFake(args => {
            if (expectedArgs) {
                assert.deepInclude(expectedArgs, args, 'Expected arguments for commercetools API call does not' +
                                                       ' match the actual');
            }
            return Promise.resolve(mockedResponse);
        });
        return ctx;
    };

    //stub for ct sdk client execute with promise resolve when multiple different responses are expected in the flow.
    ctx.prepareResolveMultipleResponse = function (mockedResponses, expectedArgs) {
        client.execute.callsFake(args => {
            if (expectedArgs) {
                assert.deepInclude(expectedArgs, args, 'Expected arguments for commercetools API call does not' +
                                                       ' match the actual');
            }
            for(let i = 0; expectedArgs.length; i++) {
                if(JSON.stringify(args) === JSON.stringify(expectedArgs[i])) {
                    return Promise.resolve(mockedResponses[i]);
                }
            }
        });
        return ctx;
    };

    //stub for ct sdk client execute with promise reject
    ctx.prepareReject = function (mockedResponse) {
        client.execute.callsFake(() => {
            return Promise.reject(mockedResponse);
        });
        return ctx;
    };

    ctx.requireUncached = function (module) {
        delete require.cache[require.resolve(module)];
        return require(module);
    };

    ctx.deleteArgs = function () {
        args = null;
        return ctx;
    };


};
