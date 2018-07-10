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

//config object for tests
const config = {
    CT_PROJECTKEY: 'TESTS_PROJECT',
    CT_AUTH_HOST: 'http://does-not.exist',
    CT_CLIENTID: 'hello-this-is-client',
    CT_CLIENTSECRET: 'I-refuze-to-tell-you-secrets',
    CART_EXPAND_QS: 'expand=lineItems[*].productType&expand=lineItems[*].discountedPricePerQuantity[*].discountedPrice.includedDiscounts[*].discount&expand=shippingInfo.discountedPrice.includedDiscounts[*].discount&expand=paymentInfo.payments[*]&expand=discountCodes[*].discountCode'
};
module.exports.config = config;