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
const sampleCustomer = require('../resources/sample-customer');
const config = require('../lib/config').config;

describe('commercetools getCustomerById', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'getCustomerById');

        it('Test getCustomerById', () => {
            let args = {};
            args.id = '10f429fb-4e97-4be7-a7da-6c13bf50acdc';
            const expectedArgs = [{
                uri:  `/${config.CT_PROJECTKEY}/customers/${args.id}`,
                headers: undefined,
                method: 'GET'
            }];
            return this.prepareResolve({body: sampleCustomer}, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let customer = result.response.body;
                assert.strictEqual(customer.id, args.id, 'Customer identifier does not match');
            });
        });

        it('Test customer not found with backend message', () => {
            let args = {};
            args.id = '10f429fb-4e97-XXXX-a7da-6c13bf50acdc';
            let errorMsg = 'The Resource with ID \'10f429fb-4e97-XXXX-a7da-6c13bf50acdc\' was not found.';
            return this.prepareReject({code: 404, body: {message: errorMsg}}).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                assert.strictEqual(result.response.error.message, 'CommerceTools resource not found');
            });
        });
        
        it('Test getCustomerById missing args', () => {
            return this.deleteArgs().prepareReject(null).execute(null).then(result => {
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
            });
        });
    });
});