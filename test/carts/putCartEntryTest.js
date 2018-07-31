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
const samplecartentry400 = require('../resources/sample-cart-entry-400');
const config = require('../lib/config').config;

/**
 * Describes the unit tests for commerce tools put cart entry operation.
 */
describe('commercetools putCartEntry', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'putCartEntry');


        it('PUT /cart/{id}/entries/{id} HTTP 400 - empty parameters', () => {
            return this.execute({})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.name, 'MissingPropertyError');
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 400 - missing cart id', () => {
            return this.execute({'cartEntryId': '12345', 'quantity': 0})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'id\' is missing.');
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 400 - missing cart id', () => {
            return this.execute({'id': '12345', 'quantity': 0})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'cartEntryId\' is missing.');
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 400 - missing quantity', () => {
            return this.execute({'id': '12345', 'cartEntryId': '12345'})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'quantity\' is missing.');
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 400 - invalid double quantity', () => {
            return this.execute({'id': '12345', 'cartEntryId': '12345', 'quantity': 2.2})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message,
                                              'Parameter \'quantity\' must be an integer');
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 400 - invalid NaN quantity', () => {
            return this.execute({'id': '12345', 'cartEntryId': '12345', 'quantity': 'z'})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message,
                                              'Parameter \'quantity\' must be an integer');
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 200 ', () => {
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'GET',
                headers: undefined
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'POST',
                body: '{"actions":[{"action":"changeLineItemQuantity","lineItemId":"12345","quantity":1}],"version":7}',
                headers: undefined
            }];
            let args = {
                id: '12345-7',
                cartEntryId: '12345',
                quantity: 1,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);
                       });
        });

        it('PUT /cart/{id}/entries/{id} uses expand to get discount', () => {
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'GET',
                headers: undefined
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'POST',
                body: '{"actions":[{"action":"changeLineItemQuantity","lineItemId":"12345","quantity":1}],"version":7}',
                headers: undefined
            }];
            let args = {
                id: '12345-7',
                cartEntryId: '12345',
                quantity: 1,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            }
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);
                       });
        });

        it('PUT /cart/{id}/entries/{id} HTTP 404 Cart Not Found ', () => {
            return this.prepareReject(samplecart404)
                       .execute({'id': '12345-7', 'cartEntryId': '12345', 'quantity': 1})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                       });
        });

        it('POST /cart/{id} HTTP 400 - existing cart', () => {
            return this.prepareReject(samplecartentry400)
                       .execute({'id': '12345-7', 'cartEntryId': '12345', 'quantity': 1})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.name, 'CommerceServiceBadRequestError');
                       });
        });

    });
});

