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

const expect = chai.expect;

chai.use(chaiHttp);

describe('commercetools postCustomerLogin', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        const email = 'jelger@adobe.com';
        const password = 'dummy1234';

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

                    expect(res.body).to.have.own.property('customer');
                    expect(res.body.customer.email).to.equal(email);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns a 400 error for bad credentials', function() {
            return chai.request(env.openwhiskEndpoint)
                .post(env.customersPackage + 'postCustomerLogin')
                .query({
                    email: email,
                    password: 'bad-password'
                })
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });
    });
});