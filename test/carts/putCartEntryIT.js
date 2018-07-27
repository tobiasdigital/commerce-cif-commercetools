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
const extractToken = require('../lib/setupIT').extractToken;
const CcifIdentifier = require('../../src/common/CcifIdentifier');
const expect = chai.expect;
const OAUTH_TOKEN_NAME = require('../../src/common/constants').OAUTH_TOKEN_NAME;
chai.use(chaiHttp);


describe('commercetools putCartEntry', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';

        let cartId;
        let cartEntryId;
        let accessToken;

        /** Create cart. */
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
                    cartEntryId = res.body.cartEntries[0].id;
                    // Store token to access the anonymous session
                    accessToken = extractToken(res);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('updates the quantity of a cart entry to a new value', function() {
            const newQuantity = 15;
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'putCartEntry')
                .query({
                    quantity: newQuantity,
                    id: cartId,
                    cartEntryId: cartEntryId
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);

                    // Verify cart content
                    expect(res.body.cartEntries).to.have.lengthOf(1);
                    expect(res.body.cartEntries[0].id).to.equal(cartEntryId);
                    expect(res.body.cartEntries[0].quantity).to.equal(newQuantity);

                    // Verify structure
                    expect(res.body).to.have.own.property('id');
                    let ccifResId = new CcifIdentifier(res.body.id);
                    let ccifParamId = new CcifIdentifier(cartId);
                    expect(ccifResId.getCommerceToolsId()).to.equal(ccifParamId.getCommerceToolsId());
                    expect(ccifResId.getCommerceToolsVersion()).not.to.equal(ccifParamId.getCommerceToolsVersion());
                    expect(res.body).to.have.own.property('lastModifiedDate');
                    expect(res.body).to.have.own.property('totalProductPrice');
                    expect(res.body).to.have.own.property('createdDate');
                    expect(res.body).to.have.own.property('cartEntries');
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('removes a cart entry from the cart by setting its quantity to 0', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'putCartEntry')
                .query({
                    quantity: 0,
                    id: cartId,
                    cartEntryId: cartEntryId
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);

                    expect(res.body.cartEntries).to.have.lengthOf(0);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns a 400 error for setting an invalid quantity', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'putCartEntry')
                .query({
                    quantity: -100,
                    id: cartId,
                    cartEntryId: cartEntryId
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        })

        it('returns a 400 error for updating a non existent cart entry', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'putCartEntry')
                .query({
                    quantity: 1,
                    id: cartId,
                    cartEntryId: 'does-not-exist'
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

        it('returns a 404 error for updating an entry of a non existent cart', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'putCartEntry')
                .query({
                    quantity: 1,
                    id: 'does-not-exist',
                    cartEntryId: cartEntryId
                })
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.NOT_FOUND);
                });
        });

        it('returns a 400 error for missing parameters', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'putCartEntry')
                .set('Accept-Language', 'en-US')
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

    });
});