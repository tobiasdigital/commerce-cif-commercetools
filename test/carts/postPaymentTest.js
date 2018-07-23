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
const samplePayment = require('../resources/sample-payment');
const config = require('../lib/config').config;
const PaymentMapper = require('../../src/carts/PaymentMapper');

/**
 * Describes the unit tests for commerce tools put cart entry operation.
 */
describe('commercetools post payment test', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'postPayment');

        let paymentMapper = new PaymentMapper();

        it('PUT /cart/{id}/payment HTTP 400 - missing cart id', () => {
            return this.execute()
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'id\' is missing.');
                       });
        });

        it('POST /cart/{id}/payment HTTP 400 - missing payment', () => {
            return this.execute({id: '12345'})
                       .then(result => {
                           assert.isDefined(result.response);
                           assert.isDefined(result.response.error);
                           assert.strictEqual(result.response.error.message, 'Parameter \'payment\' is missing.');
                       });
        });

        it('POST /cart/{id}/payment HTTP 400 - payment already exists', () => {
            const args = {
                id: '12345-7',
                payment: {}
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
                body: `{"actions":[{"action":"setShippingMethod","shippingMethod":{"typeId":"shipping-method","id":"6f0b3638-73a5-4d80-8455-081d3e9f98bb"}}],"version":7}`,
                headers: undefined
            }];
            return this
                .prepareResolve(samplecart1, expectedArgs)
                .execute(args)
                .then(result => {
                    assert.isDefined(result.response.error);
                    let error = result.response.error;
                    assert.strictEqual(error.name, 'CommerceServiceBadRequestError');
                    assert.strictEqual(error.message, 'Bad CommerceTools Request');
                    assert.strictEqual(error.cause.code, 400);
                    assert.strictEqual(error.cause.message, 'Cart payment already exists.');
                });
        });

        it('POST /cart/{id}/payment HTTP 200', () => {
            let payment = {
                token: '1234',
                method: 'credit-card',
                statusCode: '1',
                status: 'Paid',
                amount: {
                    centAmount: 17900,
                    currency: 'USD'
                }
            };
            
            let paymentDraft = paymentMapper.mapPaymentDraft(payment);
        
            const args = {
                id: '12345-7',
                payment: payment,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'GET',
                headers: undefined
            }, {
                uri: '/TESTS_PROJECT/payments',
                headers: undefined,
                method: 'POST',
                body: JSON.stringify(paymentDraft)
            }, {
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/carts/12345?${config.CART_EXPAND_QS}`),
                method: 'POST',
                body: `{"actions":[{"action":"addPayment","payment":{"id":"efaa7df3-46f2-4116-8170-f1623e78aca7"}}],"version":7}`,
                headers: undefined
            }];
            let sampleCartNoPayment = JSON.parse(JSON.stringify(samplecart1));
            delete sampleCartNoPayment.body.paymentInfo;
            let mockedResponses = [];
            //this needs to be in the same order as the expected Args.
            mockedResponses.push(sampleCartNoPayment);
            mockedResponses.push(samplePayment);
            mockedResponses.push(samplecart1);
            return this
                .prepareResolveMultipleResponse(mockedResponses, expectedArgs)
                .execute(args)
                .then(result => {
                    assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                    assert.isDefined(result.response);
                    assert.isDefined(result.response.body);
                    assert.isDefined(result.response.body.id);
                    assert.isDefined(result.response.body.cartEntries);
                    assert.isDefined(result.response.body.payment);
                });
        });

    });
});

