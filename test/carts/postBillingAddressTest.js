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

const setup = require('../lib/setupTest').setup;

/**
 * Describes the unit tests for commerce tools put cart entry operation.
 */
describe('commercetools postBillingAddress', () => {

    describe('Unit Tests', () => {

        //build the helper in the context of '.this' suite
        setup(this, __dirname, 'postBillingAddress');

        //initialize the address helper
        const addressTests = require('../lib/addressUTHelper').tests(this, 'billing');

        it('PUT /cart/{id}/billingaddress HTTP 400 - missing cart id', () => {
            return addressTests.missingCartId();
        });

        it('POST /cart/{id}/billingaddress HTTP 400 - empty billing address parameters', () => {
            return addressTests.emptyAddress();
        });

        it('PUT /cart/{id}/billingaddress HTTP 200 ', () => {
            return addressTests.postAddressSuccess();
        });

    });
});

