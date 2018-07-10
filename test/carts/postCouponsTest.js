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

const setup = require('../lib/setupTest').setup;
const assert = require('chai').assert;
const config = require('../lib/config').config;
const samplecart = require('../resources/sample-cart');

/**
 * Unit tests for postCoupons action.
 */
describe('commercetools postCoupons', () => {
    describe('Unit Tests', () => {

        // Add action helpers to `.this` context
        setup(this, __dirname, 'postCoupons');

        it('returns an error if the cart id is missing', () => {
            return this.execute()
                .then(result => {
                    assert.isDefined(result.response);
                    assert.isDefined(result.response.error);
                    assert.strictEqual(result.response.error.message, 'Parameter \'id\' is missing.');
                });
        });

        it('returns an error if the coupon code is missing', () => {
            return this.execute({'id': '12345-1'})
                .then(result => {
                    assert.isDefined(result.response);
                    assert.isDefined(result.response.error);
                    assert.strictEqual(result.response.error.message, 'Parameter \'code\' is missing.');
                });
        });

        it('adds the coupon code to the cart if all required parameters are given', () => {
            const expectedArgs = {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'POST',
                body: `{"actions":[{"action":"addDiscountCode","code":"APRIL18"}],"version":1}`,
                headers: undefined
            };
            return this.prepareResolve(samplecart, expectedArgs)
                .execute({
                    'id': '12345-1', 
                    'code': 'APRIL18'
                })
                .then(result => {
                    assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                    assert.isDefined(result.response);
                    assert.isDefined(result.response.body);
                });
        });
    });
});