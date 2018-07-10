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
const config = require('../lib/config').config;

/**
 * Describes the unit tests for commerce tools cart payment method delete operation.
 */
describe('commercetools deletePayment', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'deletePayment');

        it('DELETE /cart/{id}/payment HTTP 400 - missing cart id', () => {
            return this.execute()
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'id\' is missing.');
                       });
        });

        it('DELETE /cart/{id}/payment HTTP 400 - payment does not exist. ', () => {
            const args = {
                id: '12345-7'
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'GET',
                headers: undefined
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'POST',
                body: `{"actions":[{"action":"removePayment","payment":{"id":"7a975b17-4a8e-457b-9338-4229dac84066","version":1}}],"version":7}`,
                headers: undefined
            }, {
                uri: '/TESTS_PROJECT/payments/7a975b17-4a8e-457b-9338-4229dac84066?version=1',
                headers: undefined,
                method: 'DELETE'
            }];
            let sampleCartNoPayment = JSON.parse(JSON.stringify(samplecart1));
            delete sampleCartNoPayment.body.paymentInfo;
            let mockedResponses = [];
            //this needs to be in the same order as the expected Args.
            mockedResponses.push(sampleCartNoPayment);
            mockedResponses.push(sampleCartNoPayment);
            mockedResponses.push('{}');
            return this
                .prepareResolveMultipleResponse(mockedResponses, expectedArgs)
                .execute(args)
                .then(result => {
                    let error = result.response.error;
                    assert.isDefined(error);
                    assert.strictEqual(error.cause.code, 400);
                    assert.strictEqual(error.cause.message, "No cart payment.");

                });
        });

        it('DELETE /cart/{id}/payment HTTP 200 ', () => {
            const args = {
                id: '12345-7'
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'GET',
                headers: undefined
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'POST',
                body: `{"actions":[{"action":"removePayment","payment":{"id":"7a975b17-4a8e-457b-9338-4229dac84066","version":1}}],"version":7}`,
                headers: undefined
            }, {
                uri: '/TESTS_PROJECT/payments/7a975b17-4a8e-457b-9338-4229dac84066?version=1',
                headers: undefined,
                method: 'DELETE'
            }];
            let sampleCartNoPayment = JSON.parse(JSON.stringify(samplecart1));
            delete sampleCartNoPayment.body.paymentInfo;
            let mockedResponses = [];
            //this needs to be in the same order as the expected Args.
            mockedResponses.push(samplecart1);
            mockedResponses.push(sampleCartNoPayment);
            mockedResponses.push('{}');
            return this
                .prepareResolveMultipleResponse(mockedResponses, expectedArgs)
                .execute(args)
                .then(result => {
                    console.log(result);
                    assert.isDefined(result.response);
                    assert.strictEqual(result.response.statusCode, 200);
                });
        });



    });
});

