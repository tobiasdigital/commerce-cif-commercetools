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
const utils = require('../lib/utils');

describe('commercetools customer mapper tests', () => {

    let action = utils.getPathForAction(__dirname, 'CustomerMapper');
    let customerMapper = require(action);

    describe('Generic unit tests', () => {
        it('customer public method', () => {
            let customer = customerMapper.mapCustomer({body: sampleCustomer});
            assert.strictEqual(sampleCustomer.id, customer.id);
            assert.strictEqual(sampleCustomer.email, customer.email);
            assert.strictEqual(sampleCustomer.firstName, customer.firstname);
            assert.strictEqual(sampleCustomer.lastName, customer.lastname);
            assert.strictEqual(sampleCustomer.createdAt, customer.createdDate);
            assert.strictEqual(sampleCustomer.lastModifiedAt, customer.lastModifiedDate);
        });
        
        it('customer public method - invalid object', () => {
            assert.throws(() => customerMapper.mapCustomer(null), MissingProperty);
        });
        
        it('customer private method', () => {
            let customer = customerMapper._mapCustomer(sampleCustomer);
            assert.strictEqual(sampleCustomer.id, customer.id);
            assert.strictEqual(sampleCustomer.email, customer.email);
            assert.strictEqual(sampleCustomer.firstName, customer.firstname);
            assert.strictEqual(sampleCustomer.lastName, customer.lastname);
            assert.strictEqual(sampleCustomer.createdAt, customer.createdDate);
            assert.strictEqual(sampleCustomer.lastModifiedAt, customer.lastModifiedDate);
        });
        
        it('customer private method - invalid object', () => {
            assert.throws(() => customerMapper._mapCustomer(null), MissingProperty);
        });
        
        it('customer login', () => {
            let loginResult = customerMapper.mapCustomerLogin(sampleCustomerLogin);
            let ctCustomer = sampleCustomerLogin.body.customer;
            let ctCart = sampleCustomerLogin.body.cart;

            assert.strictEqual(loginResult.customer.id, ctCustomer.id);
            assert.strictEqual(loginResult.cart.id, ctCart.id + '-' + ctCart.version);
        });
        
        it('customer login - invalid object', () => {
            assert.throws(() => customerMapper.mapCustomerLogin(null), MissingProperty);
        });
    });

});
