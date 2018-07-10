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

describe('commercetools deleteShippingAddress', function () {

    describe('Integration tests', function () {

        const addressTests = require('../lib/addressITHelper').tests(this, 'shipping');

        it('returns 400 for deleting shipping address of not provided cart', function () {
            return addressTests.missingCart(addressTests.deleteAddressPath);
        });

        it('returns 404 for deleting shipping address of non existing cart', function () {
            return addressTests.nonExistingCart(addressTests.deleteAddressPath);
        });

        it('removes shipping address', function () {
            return addressTests.deleteAddressSuccess();
        });
    });
});