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
const sampleCustomer = require('../resources/sample-customer');
const sampleCustomerLogin = require('../resources/sample-customer-login');
const MissingProperty = require('@adobe/commerce-cif-common').MissingPropertyException;
const CustomerMapper = require('../../src/customers/CustomerMapper');
const LanguageParser = require('../../src/common/LanguageParser');

describe('commercetools CustomerMapper', () => {

    describe('Unit tests', () => {

        let args = {
            __ow_headers: {
                'accept-language': 'en-US'
            }
        };
        let languageParser = new LanguageParser(args);
        let customerMapper = new CustomerMapper(languageParser);

        it('customer public method', () => {
            let customer = customerMapper.mapCustomer({body: sampleCustomer});
            assert.strictEqual(sampleCustomer.id, customer.id);
            assert.strictEqual(sampleCustomer.email, customer.email);
            assert.strictEqual(sampleCustomer.firstName, customer.firstName);
            assert.strictEqual(sampleCustomer.lastName, customer.lastName);
            assert.strictEqual(sampleCustomer.createdAt, customer.createdAt);
            assert.strictEqual(sampleCustomer.lastModifiedAt, customer.lastModifiedAt);
        });
        
        it('customer public method - invalid object', () => {
            assert.throws(() => customerMapper.mapCustomer(null), MissingProperty);
        });
        
        it('customer private method', () => {
            let customer = customerMapper._mapCustomer(sampleCustomer);
            assert.strictEqual(sampleCustomer.id, customer.id);
            assert.strictEqual(sampleCustomer.email, customer.email);
            assert.strictEqual(sampleCustomer.firstName, customer.firstName);
            assert.strictEqual(sampleCustomer.lastName, customer.lastName);
            assert.strictEqual(sampleCustomer.createdAt, customer.createdAt);
            assert.strictEqual(sampleCustomer.lastModifiedAt, customer.lastModifiedAt);
        });
        
        it('customer private method - invalid object', () => {
            assert.throws(() => customerMapper._mapCustomer(null), MissingProperty);
        });
        
        it('customer login', () => {
            let loginResult = customerMapper.mapCustomerLogin(sampleCustomerLogin, args);
            let ctCustomer = sampleCustomerLogin.body.customer;
            let ctCart = sampleCustomerLogin.body.cart;

            assert.strictEqual(loginResult.customer.id, ctCustomer.id);
            assert.strictEqual(loginResult.cart.id, ctCart.id + '-' + ctCart.version);
        });
        
        it('customer login - invalid object', () => {
            assert.throws(() => customerMapper.mapCustomerLogin(null, args), MissingProperty);
        });
    });

});
