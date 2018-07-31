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
const samplecart1 = require('../resources/sample-cart');
const samplecart404 = require('../resources/sample-cart-404');
const config = require('../lib/config').config;

/**
 * Describes the unit tests for commerce tools cart operation.
 */
describe('commercetools getCart', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'getCart');

        //validates that the response object is valid
        //cart properties and values are validated on object mapper tests
        it('Get /cart/{id} HTTP 200 ', () => {
            const expectedArgs = {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/me/carts/dummy?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET'
            };
            let args = {
                id: 'dummy-1',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.prepareResolve(samplecart1, expectedArgs).execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);
                       });
        });

        it('Get /cart/{id} - uses expand to get discount name in the same call', () => {
            const expectedArgs = {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/me/carts/dummy?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET'
            };
            let args = {
                id: 'dummy-1',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.prepareResolve(samplecart1, expectedArgs).execute(args);
        });

        it('Get /cart/{id} HTTP 404 - cart not found', () => {
            //for http code = 404, get cart returns Promise.resolve indicating that the item was not found
            return this.prepareReject(samplecart404)
                       .execute({'id': 'dummy-1'})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                       });
        });

        it('Get /cart/{id} HTTP UNKNOWN - unexpected http status code', () => {
            //for any http code <> 200, 404, get cart returns Promise.reject(error)
            return this.prepareReject({'code': 'UNKNOWN'}).execute({'id': 'dummy-1'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });

        it('Get /cart/{id} HTTP 400 - invalid args', () => {
            //for any http code <> 200, 404, get cart returns Promise.reject(error)
            return this.deleteArgs().prepareReject(null).execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
            });
        });

        it('Get /cart/{id} HTTP 400 - invalid cart id', () => {
            //for any http code <> 200, 404, get cart returns Promise.reject(error)
            return this.prepareReject(null).execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Get /cart/{id} HTTP 400 - empty CT response', () => {
            return this.prepareReject(undefined).execute({'id': 'dummy-1'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });

        it('Get /cart/{id} HTTP 400 - empty BODY in CT response', () => {
            return this.prepareResolve({'body': {}}).execute({'id': 'dummy-1'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });

        it('Get /cart/{id} HTTP 400 - empty cart Id in CT response', () => {
            return this.prepareResolve({'body': {'id': ''}}).execute({'id': 'dummy-1'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });

        it('Get /cart/{id} HTTP 400  - invalid line items ', () => {
            return this.prepareResolve({'body': {id: '12345-1'}}).execute({'id': 'dummy-1'}).then(result => {
                assert.strictEqual(result.response.error.name, 'UnexpectedError');
            });
        });

    });
});
