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
const sampleCustomerLogin = require('../resources/sample-customer-login');
const config = require('../lib/config').config;

describe('commercetools postCustomerLogin', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'postCustomerLogin');

        it('Test postCustomerLogin', () => {
            let args = {
                email: 'john.doe@adobe.com',
                password: 'whatever',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };

            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/login`,
                headers: undefined,
                method: 'POST',
                body: `{"email":"${args.email}","password":"${args.password}"}`
            }];

            return this.prepareResolve(sampleCustomerLogin, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let customer = result.response.body.customer;
                assert.strictEqual(customer.email, sampleCustomerLogin.body.customer.email, 'Customer email does not match');

                let cart = result.response.body.cart;
                assert.strictEqual(cart.id, sampleCustomerLogin.body.cart.id + '-' + sampleCustomerLogin.body.cart.version, 'Cart id does not match');
            });
        });

        it('Test bad customer credentials', () => {
            let args = {
                email: 'john.doe@adobe.com',
                password: 'wrong-password',
                anonymousCartId: '12345',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            
            let errorMsg = 'Account with the given credentials not found.';
            return this.prepareReject({code: 400, body: {message: errorMsg}}).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceBadRequestError');
                assert.strictEqual(result.response.error.message, 'Bad CommerceTools Request');
            });
        });
        
        it('Test postCustomerLogin missing args', () => {
            return this.deleteArgs().prepareReject(null).execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
            });
        });
    });
});