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
const samplePaymentMethods = require('../resources/sample-payment-methods-for-cart');
const action = require('../../src/carts/getPaymentMethods').main;

/**
 * Describes the unit tests for commerce tools get available shipping methods list operation.
 */
describe('commercetools get payment methods for a cart', () => {

    describe('Unit Tests', () => {

        //validates that the response object is valid
        it('returns the correct list of methods', () => {
            let args = {
                "id": "123-123-543"
            }
            return action(args)
                .then(result => {
                    assert.isDefined(result.response);
                    assert.isDefined(result.response.body);
                    assert.isArray(result.response.body);

                    let actualPaymentMethods = result.response.body;
                    let expectedPaymentMethods = samplePaymentMethods.body;

                    assert.lengthOf(actualPaymentMethods, expectedPaymentMethods.length);

                    assert.equal(expectedPaymentMethods[0].id, actualPaymentMethods[0].id);
                    assert.equal(expectedPaymentMethods[0].name,actualPaymentMethods[0].name);
                    assert.equal(expectedPaymentMethods[0].description,actualPaymentMethods[0].description);
                });
        });

        it('fails when no cart id is supplied', () => {
            let args = {};

            return action(args).then(result => {
                assert.isDefined(result.response);
                assert.isDefined(result.response.error);
                assert.equal(result.response.error.name, "MissingPropertyError");
            })
        })
    });
});