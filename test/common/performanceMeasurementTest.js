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
const CTPerformanceMeasurement = require('../../src/common/performance-measurement.js');

describe('commercetools common', () => {

    describe('Unit tests', () => {

        let argsActive = {
            __ow_headers: {
                [CTPerformanceMeasurement.const.PERF_ACTIVATE]: "YES"
            }
        }

        beforeEach(() => {
            sinon.spy(CTPerformanceMeasurement, "startBackendRequest");
            sinon.spy(CTPerformanceMeasurement, "endBackendRequest");
        });

        afterEach(() => {
            CTPerformanceMeasurement.startBackendRequest.restore();
            CTPerformanceMeasurement.endBackendRequest.restore();
        });

        it('does not update execute() if performance header is not set', () => {
            let oldExecute = () => {};
            let client = {
                execute: oldExecute
            };
            client = CTPerformanceMeasurement.decorateCommerceToolsClient(client, {});
            assert.strictEqual(client.execute, oldExecute);
        });

        it('updates execute() if performance header is set', () => {
            let oldExecute = () => {};
            let client = {
                execute: oldExecute
            };
            
            client = CTPerformanceMeasurement.decorateCommerceToolsClient(client, argsActive);
            assert.notStrictEqual(client.execute, oldExecute);
        });

        it('adds timestamps for successful backend requests', (done) => {
            let client = {
                execute: () => { return Promise.resolve(); }
            };

            client = CTPerformanceMeasurement.decorateCommerceToolsClient(client, argsActive);
            client.execute({}).then(() => {
                assert.isTrue(CTPerformanceMeasurement.startBackendRequest.calledOnce);
                assert.isTrue(CTPerformanceMeasurement.endBackendRequest.calledOnce);
                done();
            });
        });

        it('adds timestamps for failing backend requests', (done) => {
            let client = {
                execute: () => { return Promise.reject(); }
            };

            client = CTPerformanceMeasurement.decorateCommerceToolsClient(client, argsActive);
            client.execute({}).catch(() => {
                assert.isTrue(CTPerformanceMeasurement.startBackendRequest.calledOnce);
                assert.isTrue(CTPerformanceMeasurement.endBackendRequest.calledOnce);
                done();
            });
        });


    });

});