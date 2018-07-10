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
 * Describes the unit tests for commerce tools remove cart entry operation.
 */
//API test for commerce tools addCartEntry operation
describe('commercetools deleteCartEntry', () => {

    describe('Unit tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'deleteCartEntry');

        it('Remove cartEntry /cart/{id}/entries/{cartEntryId} - no args ', () => {
            //for http code = 404, get cart returns Promise.resolve indicating that the item was not found
            return this.execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Remove cartEntry /cart/{id}/entries/{cartEntryId} - no cart ID provided ', () => {
            //for http code = 404, get cart returns Promise.resolve indicating that the item was not found
            return this.execute({'id': ''}).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Remove cartEntry /cart/{id}/entries/{cartEntryId} - no line item ID provided ', () => {
            //for http code = 404, get cart returns Promise.resolve indicating that the item was not found
            return this.execute({'id': 'dummy', ' cartEntryId': ''}).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Remove cartEntry /cart/{id}/entries/{cartEntryId} HTTP 404 - cart not found', () => {
            //for http code = 404, remove cart entry/get cart returns Promise.resolve
            //indicating that the item was not found
            return this.prepareReject(samplecart404).execute(
                {'id': 'dummy-1', 'cartEntryId': '3f4130c5-6e39-4e6f-b73f-a4ecd4520577'}).then(result => {
                assert.isUndefined(result.response.body);
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
            });
        });

        it('Remove cartEntry /cart/{id}/entries/{cartEntryId} - uses expand to get discount ', () => {
            const expectedArgs = [{
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/dummy?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET'
            }, {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/dummy?${config.CART_EXPAND_QS}`),
                    method: 'POST',
                    headers: undefined,
                    body: '{"actions":[{"action":"removeLineItem","lineItemId":"3f4130c5-6e39-4e6f-b73f-a4ecd4520577"}],"version":7}'
            }];
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute({'id': 'dummy-7','cartEntryId': '3f4130c5-6e39-4e6f-b73f-a4ecd4520577'});
        });

        it('Remove cartEntry /cart/{id}/entries/{cartEntryId} HTTP 200 ', () => {
            const expectedArgs = [{
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/dummy?${config.CART_EXPAND_QS}`),
                headers: undefined,
                method: 'GET',
            }, {
                uri: encodeURI(`/${config.CT_PROJECTKEY}/carts/dummy?${config.CART_EXPAND_QS}`),
                method: 'POST',
                headers: undefined,
                body: '{"actions":[{"action":"removeLineItem","lineItemId":"3f4130c5-6e39-4e6f-b73f-a4ecd4520577"}],"version":7}'
            }];
            return this.prepareResolve(samplecart1, expectedArgs)
                       .execute({'id': 'dummy-7', 'cartEntryId': '3f4130c5-6e39-4e6f-b73f-a4ecd4520577'})
                       .then(result => {
                           assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.body);

                       });
        });
    });

});