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

describe('commercetools postCustomerLogin', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        const email = 'cif@adobe.com';
        const password = 'cif';
        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';

        let accessToken;

        /** Create cart using anonymous auth. */
        before(function() {
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

                    // Store token to access the anonymous session
                    accessToken = extractToken(res);
                });
        });

        it('performs a customer login', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.customersPackage + 'postCustomerLogin')
                .query({
                    email: email,
                    password: password
                })
                .then(function(res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);

                    requiredFields.verifyLoginResult(res.body);
                    expect(res.body.customer.email).to.equal(email);
                });
        });

        it('returns a 400 error for bad credentials', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.customersPackage + 'postCustomerLogin')
                .query({
                    email: email,
                    password: 'bad-password'
                })
                .then(function(res) {
                    expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                    expect(res).to.be.json;
                    requiredFields.verifyErrorResponse(res.body);
                });
        });

        it('check password auth login access token', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.customersPackage + 'postCustomerLogin')
                .query({
                    email: email,
                    password: password
                })
                .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
                .then(function(res) {
                    requiredFields.verifyLoginResult(res.body);
                    expect(accessToken).not.to.equal(extractToken(res));
                });
        });

    });
});