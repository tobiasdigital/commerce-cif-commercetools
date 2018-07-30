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


describe('commercetools getShippingMethods integration test for a cart', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        let cartId;
        let accessToken;

        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';

        /** Create cart. */
        beforeEach(function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCart')
                .query({
                    currency: 'USD',
                    quantity: 2,
                    productVariantId: productVariantId
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.CREATED);
                    expect(res.body.id).to.not.be.empty;

                    // Store cart id
                    cartId = res.body.id;
                    // Store token to access the anonymous session
                    accessToken = extractToken(res);
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it('returns the list of available shipping methods for the cart', function() {
            // set valid shipping address for cart
            const args = {
                id: cartId
            };
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postShippingAddress')
                .query(args)
                .send({
                    address: {country: 'US'}
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);
                    expect(res.body).to.have.property('shippingAddress');

                    // Update cart id
                    cartId = res.body.id;

                    return chai.request(env.openwhiskEndpoint)
                        .get(env.cartsPackage + 'getShippingMethods')
                        .query({id: cartId})
                        .set('Accept-Language', 'en-US')
                        .set('Cache-Control', 'no-cache')
                        .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`);
                })
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);

                    // Verify structure
                    expect(res.body).to.be.an('array');
                    res.body.forEach(shippingMethod => {
                        requiredFields.verifyShippingMethod(shippingMethod);
                        expect(shippingMethod).to.have.own.property('description');
                    });
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it('returns an empty list for cart with no shipping methods defined for country', function() {
            // set valid shipping address for cart, country has no shipping methods defined
            const args = {
                id: cartId
            };
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postShippingAddress')
                .query(args)
                .send({
                    address: {country: 'FR'}
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);
                    expect(res.body).to.have.property('shippingAddress');

                    return chai.request(env.openwhiskEndpoint)
                        .get(env.cartsPackage + 'getShippingMethods')
                        .query({id: cartId})
                        .set('Accept-Language', 'en-US')
                        .set('Cache-Control', 'no-cache')
                        .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`);
                })
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);

                    // Verify structure
                    expect(res.body).to.be.an('array').that.is.empty;
                })
                .catch(function (err) {
                    throw err;
                });
        });

        it('returns a 400 error for a cart without shipping address', function() {
            // set valid shipping address for cart
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deleteShippingAddress')
                .query({id: cartId})
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);
                    expect(res.body).to.not.have.property('shippingAddress');

                    return chai.request(env.openwhiskEndpoint)
                        .get(env.cartsPackage + 'getShippingMethods')
                        .query({id: cartId})
                        .set('Accept-Language', 'en-US')
                        .set('Cache-Control', 'no-cache')
                        .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`);
                })
                .catch(function (err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

        it('returns a 400 error for a missing id parameter', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.cartsPackage + 'getShippingMethods')
                .set('Accept-Language', 'en-US')
                .set('Cache-Control', 'no-cache')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

        it('returns a 400 error for a non existent shopping cart', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.cartsPackage + 'getShippingMethods')
                .query({id: 'does-not-exist'})
                .set('Accept-Language', 'en-US')
                .set('Cache-Control', 'no-cache')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

    });
});