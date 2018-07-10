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
const sampleOrder = require('../resources/sample-order');
const sampleCartNotFound = require('../resources/sample-cart-404');
const sampleCartConflict = require('../resources/sample-cart-409');
const config = require('../lib/config').config;

/**
 * Describes the unit tests for commerce tools post order operation.
 */
describe('commercetools postOrder', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'postOrder');

        it('POST /orders HTTP 400 - missing cart id', () => {
            return this.execute()
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'cartId\' is missing.');
                       });
        });

        it('POST /orders HTTP 404 - cart not found with cached version', () => {
            const args = {
                cartId: '12345-7'
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345`),
                method: 'GET',
                headers: undefined
            }];
            return this
                .prepareReject(sampleCartNotFound, expectedArgs)
                .execute(args)
                .then(result => {
                    let error = result.response.error;
                    assert.isDefined(result.response);
                    assert.isDefined(error.name);
                    assert.isDefined(error.cause);
                    assert.strictEqual(error.name, 'CommerceServiceResourceNotFoundError');
                });
        });

        it('POST /orders HTTP 404 - conflict with cached version', () => {
            const args = {
                cartId: '12345-7'
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345`),
                method: 'GET',
                headers: undefined
            }];
            return this
                .prepareReject(sampleCartConflict, expectedArgs)
                .execute(args)
                .then(result => {
                    let error = result.response.error;
                    assert.isDefined(result.response);
                    assert.isDefined(error.name);
                    assert.isDefined(error.cause);
                });
        });

        it('POST /orders HTTP 404 - cart not found with loaded cart version', () => {
            const args = {
                cartId: '12345-7',
                'USE_CACHED_CART_VERSION': false
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345`),
                method: 'GET',
                headers: undefined
            }];
            return this
                .prepareReject(sampleCartNotFound, expectedArgs)
                .execute(args)
                .then(result => {
                    let error = result.response.error;
                    assert.isDefined(result.response);
                    assert.isDefined(error.name);
                    assert.isDefined(error.cause);
                    assert.strictEqual(error.name, 'CommerceServiceResourceNotFoundError');
                });
        });

        it('POST /orders HTTP 200 - success with cached cart version', () => {
            const args = {
                cartId: '12345-1'
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345`),
                method: 'GET',
                headers: undefined
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/orders`),
                headers: undefined,
                method: 'POST',
                body: `{"id":"12345","version":1}`
            }];
            return this.prepareResolve(sampleOrder, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);
                           assert.strictEqual(result.response.body.id, sampleOrder.body.id);
                       });
        });

        it('POST /orders HTTP 200 - success with loaded cart version', () => {
            const args = {
                cartId: '12345-1',
                'USE_CACHED_CART_VERSION': false
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345`),
                method: 'GET',
                headers: undefined
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/orders`),
                headers: undefined,
                method: 'POST',
                body: `{"id":"12345","version":1}`
            }];
            return this.prepareResolve(sampleOrder, expectedArgs)
                       .execute(args)
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);
                           assert.strictEqual(result.response.body.id, sampleOrder.body.id);
                       });
        });
    });
});

