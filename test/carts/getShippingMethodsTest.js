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
const setup = require('../lib/setupTest').setup;
const sampleShippingMethodsForCart = require('../resources/sample-shippingmethods-for-cart');
const config = require('../lib/config').config;

const sampleShippingMethodsList = JSON.parse(JSON.stringify(sampleShippingMethodsForCart));

/**
 * Describes the unit tests for commerce tools get available shipping methods list operation.
 */
describe('commercetools getShippingMethods for a cart', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'getShippingMethods');

        //validates that the response object is valid
        it('Get /cart/{id}/shippingmethods HTTP 200 ', () => {
            const expectedArgs = {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/shipping-methods?cartId=dummy`),
                headers: undefined,
                method: 'GET'
            };
            let args = {
                id: 'dummy-1',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            }
            return this.prepareResolve(sampleShippingMethodsList, expectedArgs).execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);
                           assert.isArray(result.response.body);
                           assert.lengthOf(result.response.body, sampleShippingMethodsList.body.length);
                       });
        });

        it('Get /cart/{id}/shippingmethods HTTP UNKNOWN - unexpected http status code', () => {
            return this.prepareReject({'code': 'UNKNOWN'}).execute({'id': 'dummy'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });

        it('Get /cart/{id}/shippingmethods HTTP 400 - invalid args', () => {
            return this.deleteArgs().prepareReject(null).execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
            });
        });

        it('Get /cart/{id}/shippingmethods HTTP 400 - invalid cart id', () => {
            return this.prepareReject(null).execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Get /cart/{id}/shippingmethods HTTP 400 - empty CT response', () => {
            return this.prepareReject(undefined).execute({'id': 'dummy-1'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });
    });
});
