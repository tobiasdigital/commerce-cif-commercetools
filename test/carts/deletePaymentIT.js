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


describe('commercetools deletePayment', function () {

    describe('Integration tests', function () {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        let cartId;
        let accessToken;

        let ccifPayment = {
            token: '1234',
            method: 'credit-card',
            statusCode: '1',
            status: 'Paid',
            value: {
                amount: 17900,
                currency: 'USD'
            }
        };
        
        /** Create empty cart. */
        beforeEach(function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartEntry')
                .query({
                    currency: 'USD'
                })
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

        it('returns 400 for deleting payment of not provided cart', function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deletePayment')
                .query({})
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(res).to.be.json;
                    requiredFields.verifyErrorResponse(res.body);
                });
        });

        it('returns 404 for deleting payment method of non existing cart', function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deletePayment')
                .query({
                    id: 'non-existing-cart-id'
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.have.status(HttpStatus.NOT_FOUND);
                    expect(res).to.be.json;
                    requiredFields.verifyErrorResponse(res.body);
                });
        });

        it('returns 400 for removing non existing payment', function () {
            const args = {
                id: cartId
            };
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deletePayment')
                .query(args)
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(res).to.be.json;
                    requiredFields.verifyErrorResponse(res.body);
                })
        });

        it('returns 200 for successfully removing a cart payment', function () {
            const args = {
                id: cartId,
            };
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postPayment')
                .query(args)
                .send({
                    payment: ccifPayment
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);
                    let payment = res.body.payment;
                    requiredFields.verifyPayment(payment);
                    expect(payment).to.have.property('value');
                    expect(payment.value).to.have.property('currency');
                    expect(payment.value).to.have.property('amount');
                    expect(payment).to.have.property('createdAt');
                    expect(payment).to.have.property('lastModifiedAt');

                    // Update cart id
                    cartId = res.body.id;

                    return chai.request(env.openwhiskEndpoint)
                        .post(env.cartsPackage + 'deletePayment')
                        .query({id: cartId})
                        .set('Accept-Language', 'en-US')
                        .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`);
                })
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);
                    expect(res.body).to.not.have.property('paymentInfo');
                });
        });

    });
});