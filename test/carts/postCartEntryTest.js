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

// Used to test a cart with a customer id
const sampleCustomerCart = JSON.parse(JSON.stringify(samplecart1));

/**
 * Describes the unit tests for commerce tools add cart entry operation.
 */
describe('commercetools postCartEntry', () => {

    describe('Unit tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'postCartEntry');

        it('POST /cart/{id} HTTP 400 - invalid currency', () => {
            //for any http code <> 200, 404, get cart returns Promise.resolve(error)
            let args = {
                currency: 'US',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.execute(args).then(result => {
                assert.isDefined(result.response.error);
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
                assert.strictEqual(result.response.error.message, `Invalid currency code 'US'`);
            });
        });

        const invalidProductVariantIds = ['526dc571-104f-40fb-b761-71781a97910b',
                                          '526dc571-104f-40fb-b761-71781a97910b-',
                                          '526dc571-104f-40fb-b761-71781a97910b-a'];
        invalidProductVariantIds.forEach(invalidProductVariantId => {
            it(`POST /cart/{id} HTTP 400 - invalid product variant id: ${invalidProductVariantId}`, () => {
                const args = {
                    id: '12345',
                    currency: 'USD',
                    productVariantId: invalidProductVariantId,
                    __ow_headers: {
                        'accept-language': 'en-US'
                    }
                };
                return this.execute(args).then(result => {
                    assert.isDefined(result.response.error);
                    assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
                    assert.strictEqual(result.response.error.message,
                                       `Invalid value '${invalidProductVariantId}' for property 'productVariantId'. Must match /^([0-9a-z-]+?)-([\\d]{1,3})$/`);
                });
            });
        });

        ['x', 2.2].forEach(invalidQuantity => {
            it(`POST /cart/{id} HTTP 400 - invalid quantity: ${invalidQuantity}`, () => {
                const args = {
                    id: '12345',
                    currency: 'USD',
                    productVariantId: '526dc571-104f-40fb-b761-71781a97910b-1',
                    quantity: invalidQuantity,
                    __ow_headers: {
                        'accept-language': 'en-US'
                    }
                };
                return this.execute(args).then(result => {
                    assert.isDefined(result.response.error);
                    assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
                    assert.strictEqual(result.response.error.message, `Parameter 'quantity' must be an integer`);
                });
            });
        });

        it('Creating a new cart uses expand to get discount', () => {
            const args = {
                currency: 'USD',
                productVariantId: '526dc571-104f-40fb-b761-71781a97910b-1',
                quantity: 2,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET'
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'POST',
                body: '{"currency":"USD","lineItems":[{"productId":"526dc571-104f-40fb-b761-71781a97910b","variantId":1,"quantity":2}]}'
            }];
            return this.prepareResolve(samplecart1, expectedArgs).execute(args);
        });

        it('Adding to an existing cart uses expand to get discount', () => {
            const args = {
                id: '1234-7',
                currency: 'USD',
                productVariantId: '526dc571-104f-40fb-b761-71781a97910b-1',
                quantity: 2,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                    uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/1234?${config.CART_EXPAND_QS}`),
                    headers: undefined,
                    method: 'GET'
                }, {
                    uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/1234?${config.CART_EXPAND_QS}`),
                    headers: undefined,
                    method: 'POST',
                    body: '{"actions":[{"action":"addLineItem","productId":"526dc571-104f-40fb-b761-71781a97910b","variantId":1,"quantity":2}],"version":7}'
                }];

            return this.prepareResolve(samplecart1, expectedArgs).execute(args).then(result => {
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);
            });
        });

        it('POST /cart/ HTTP 404 - cart not found with cached version', () => {
            const args = {
                id: '12345-1',
                currency: 'USD',
                productVariantId: '526dc571-104f-40fb-b761-71781a97910b-1',
                quantity: 1,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.prepareReject(samplecart404)
                .execute(args)
                .then(result => {
                    assert.isUndefined(result.response.body);
                    assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                });
        });

        it('POST /cart/ HTTP 404 - cart not found (load cart)', () => {
            const args = {
                'id': '12345-1',
                'currency': 'USD',
                'productVariantId': '526dc571-104f-40fb-b761-71781a97910b-1',
                'quantity': 1,
                'USE_CACHED_CART_VERSION': false,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.prepareReject(samplecart404)
                       .execute(args)
                       .then(result => {
                           assert.isUndefined(result.response.body);
                           assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                       });
        });

        it('POST /cart/ HTTP 201 - new empty', () => {
            const args = {
                'currency': 'USD',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'POST',
                body: `{"currency":"${args.currency}"}`
            };
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.strictEqual(result.response.statusCode, 201);
                           assert.isDefined(result.response.body);
                       });
        });

        it('POST /cart/ HTTP 201 - new cart with one entry', () => {
            const args = {
                'currency': 'USD',
                'productVariantId': '526dc571-104f-40fb-b761-71781a97910b-1',
                'quantity': 2,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'POST',
                body: '{"currency":"USD","lineItems":[{"productId":"526dc571-104f-40fb-b761-71781a97910b","variantId":1,"quantity":2}]}'
            };
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.strictEqual(result.response.statusCode, 201);
                           assert.isDefined(result.response.body);
                       });
        });

        it('POST /cart/{id} HTTP 201 - existing cart with cached version', () => {
            const args = {
                'id': '12345-7',
                'currency': 'USD1',
                'productVariantId': '526dc571-104f-40fb-b761-71781a97910b-1',
                'quantity': 2,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET'
            }, {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'POST',
                body: '{"actions":[{"action":"addLineItem","productId":"526dc571-104f-40fb-b761-71781a97910b","variantId":1,"quantity":2}],"version":7}'
            }];
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.strictEqual(result.response.statusCode, 201);
                           assert.isDefined(result.response.body);
                       });
        });

        it('POST /cart/{id} HTTP 201 - existing cart with load cart version', () => {
            const args = {
                'id': '12345-7',
                'currency': 'USD1',
                'productVariantId': '526dc571-104f-40fb-b761-71781a97910b-1',
                'quantity': 2,
                'USE_CACHED_CART_VERSION': false,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET'
            }, {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'POST',
                body: '{"actions":[{"action":"addLineItem","productId":"526dc571-104f-40fb-b761-71781a97910b","variantId":1,"quantity":2}],"version":7}'
            }];
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.strictEqual(result.response.statusCode, 201);
                           assert.isDefined(result.response.body);
                       });
        });

        it('POST /cart/{id} HTTP 403 - existing cart with missing customer id', () => {
            const args = {
                'id': '12345-1',
                'currency': 'USD',
                'productVariantId': '526dc571-104f-40fb-b761-71781a97910b-1',
                'quantity': 2,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            sampleCustomerCart.body.customerId = '1234';
            return this.prepareResolve(sampleCustomerCart)
                       .execute(args)
                       .then(result => {
                           assert.strictEqual(result.response.error.name, 'CommerceServiceForbiddenError');
                       });
        });
    });
});