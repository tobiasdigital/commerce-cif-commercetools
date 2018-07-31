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

const CTPerformanceMeasurement = require('@adobe/commerce-cif-commercetools-common/performance-measurement.js');
const CommerceToolsAddressHelper = require('./CommerceToolsAddressHelper');
const createClient = require('@commercetools/sdk-client').createClient;
const LanguageParser = require('@adobe/commerce-cif-commercetools-common/LanguageParser');
const CartMapper = require('./CartMapper');

/**
 * This action deletes a cart billing address.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.id                    cart id;
 *
 * @return  {Promise}                           the cart without a billing address;
 */

function deleteBillingAddress(args) {
    let languageParser = new LanguageParser(args);
    let cartMapper = new CartMapper(languageParser);

    return CommerceToolsAddressHelper.deleteBillingAddress(createClient, args, cartMapper.mapCart.bind(cartMapper));
}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(deleteBillingAddress);


