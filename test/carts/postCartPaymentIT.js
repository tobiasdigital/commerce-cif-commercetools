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

const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const setup = require('../lib/setupIT.js').setup;
const requiredFields = require('../lib/requiredFields');
const extractToken = require('../lib/setupIT').extractToken;
const expect = chai.expect;
const OAUTH_TOKEN_NAME = require('../../src/common/constants').OAUTH_TOKEN_NAME;
chai.use(chaiHttp);

describe('commercetools postCartPayment', function () {

    describe('Integration tests', function () {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        let cartId;
        let accessToken;

        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';
        let ccifPayments = {
            'card':{
                token: '1234',
                method: 'credit-card',
                statusCode: '1',
                status: 'Paid',
                value: {
                    amount: 17900,
                    currency: 'USD'
                }
            },
            'bank':{
                token: '1234',
                method: 'bank-transfer',
                statusCode: '1',
                status: 'Paid',
                value: {
                    amount: 17900,
                    currency: 'USD'
                }
            }
        }

        /** Create empty cart. */
        beforeEach(function () {
            return chai
                .request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartEntry')
                .query({currency: 'USD', quantity: 5, productVariantId: productVariantId})
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.CREATED);
                    // Store cart id
                    cartId = res.body.id;
                    // Store token to access the anonymous session
                    accessToken = extractToken(res);
                });
        });

        it('returns 400 for posting the payment to an non existing cart', function () {
            return chai
                .request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartPayment')
                .query({id: 'non-existing-cart-id'})
                .send({payment: ccifPayments["card"]})
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.have.status(HttpStatus.NOT_FOUND);
                    expect(res).to.be.json;
                    requiredFields.verifyErrorResponse(res.body);
                });
        });

        it('returns 400 for posting to payment without payment', function () {
            return chai
                .request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartPayment')
                .query({id: cartId})
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(res).to.be.json;
                    requiredFields.verifyErrorResponse(res.body);
                });
        });

        it('sets payment method', function () {
            const args = {
                id: cartId
            };

            return chai
                .request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartPayment')
                .query(args)
                .send({payment: ccifPayments["card"]})
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);
                    expect(res.body).to.have.property('payments');
                    let payment = res.body.payments[0];
                    requiredFields.verifyPayment(payment);
                    expect(payment).to.have.property('value');
                    requiredFields.verifyPrice(payment.value);
                    expect(payment).to.have.property('createdAt');
                    expect(payment).to.have.property('lastModifiedAt')
                });
        });

        it('returns 200 for posting for an additional payment', function () {
            const args = {
                id: cartId
            };
            return chai
                .request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartPayment')
                .query(args)
                .send({payment: ccifPayments["card"]})
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    // Update cart id
                    args.id = res.body.id;
                    return chai
                        .request(env.openwhiskEndpoint)
                        .post(env.cartsPackage + 'postCartPayment')
                        .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                        .query(args)
                        .send({payment:ccifPayments["bank"]})
                        .set('Accept-Language', 'en-US');
                })
                .then(res => {
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('payments');
                    let payments = res.body.payments;
                    expect(payments).to.have.length(2);
                    payments.map(requiredFields.verifyPayment);
                });
        });
    });
});