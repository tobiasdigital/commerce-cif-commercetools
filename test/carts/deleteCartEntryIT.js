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


describe('commercetools deleteCartEntry', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';
        const productVariantIdSecond = '90ed1673-4553-47c6-9336-5cb23947abb2-2';

        let cartId;
        let cartEntryId;
        let accessToken;

        /** Create cart and add product. */
        beforeEach(function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartEntry')
                .query({
                    currency: 'USD',
                    quantity: 2,
                    productVariantId: productVariantId
                })
                .set('Accept-Language', 'en-US')
                .then(function(res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.CREATED);

                    // Store cart id
                    cartId = res.body.id;
                    // Store cart entry id
                    cartEntryId = res.body.entries[0].id;
                    // Store token to access the anonymous session
                    accessToken = extractToken(res);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('removes an entry from a cart', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deleteCartEntry')
                .query({
                    id: cartId,
                    cartEntryId: cartEntryId
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function(res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);

                    expect(res.body.entries).to.have.lengthOf(0);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('only removes one entry from a cart', function() {
            let cartEntryIdSecond;

            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartEntry')
                .query({
                    id: cartId,
                    quantity: 5,
                    productVariantId: productVariantIdSecond
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.CREATED);
                    requiredFields.verifyCart(res.body);

                    // Verify that two products are in the cart
                    expect(res.body.entries).to.have.lengthOf(2);

                    for(let entry of res.body.entries) {
                        if(entry.productVariant.id == productVariantIdSecond) {
                            cartEntryIdSecond = entry.id;
                        }
                    }

                    // Remove newly added product
                    return chai.request(env.openwhiskEndpoint)
                        .post(env.cartsPackage + 'deleteCartEntry')
                        .query({
                            id: cartId,
                            cartEntryId: cartEntryIdSecond
                        })
                        .set('Accept-Language', 'en-US')
                        .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`);
                })
                .then(function(res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    requiredFields.verifyCart(res.body);

                    // Verify that only original product is still in the cart
                    expect(res.body.entries).to.have.lengthOf(1);
                    expect(res.body.entries[0].id).to.equal(cartEntryId);
                })
                .catch(function(err) {
                    throw err;
                });
            // Add another product, remove original product, verify that added product is still there
        });

        it('returns a 400 error for an invalid entry id', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deleteCartEntry')
                .query({
                    id: cartId,
                    cartEntryId: 'INVALID ENTRY |D'
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

        it('returns a 400 error for a non existent entry id', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deleteCartEntry')
                .query({
                    id: cartId,
                    cartEntryId: 'does-not-exist'
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

        it('returns a 404 error for a non existent cart', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deleteCartEntry')
                .query({
                    id: 'does-not-exist',
                    cartEntryId: cartEntryId
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.NOT_FOUND);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

        it('returns a 400 error for missing parameters', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'deleteCartEntry')
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(err.response).to.be.json;
                    requiredFields.verifyErrorResponse(err.response.body);
                });
        });

    });
});