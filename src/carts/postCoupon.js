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
const createClient = require('@commercetools/sdk-client').createClient;
const CartMapper = require('./CartMapper');
const LanguageParser = require('@adobe/commerce-cif-commercetools-common/LanguageParser');
const CommerceToolsCart = require('./CommerceToolsCart');
const CcifIdentifier = require('@adobe/commerce-cif-commercetools-common/CcifIdentifier');
const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * This action adds a coupon to a cart.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.id                   cart id
 * @param   {string} args.code                 coupon code
 *
 * @return  {Promise}                          the cart with the coupon applied
 */
function postCoupon(args) {

    // Validate arguments
    const validator = new InputValidator(args, ERROR_TYPE)
        .checkArguments()
        .mandatoryParameter('id')
        .mandatoryParameter('code');

    if (validator.error) {
        return validator.buildErrorResponse();
    }

    // Data for cart update request
    const data = {
        actions: [{
            action: "addDiscountCode",
            code: args.code
        }]
    };
    
    let languageParser = new LanguageParser(args);
    let cartMapper = new CartMapper(languageParser);

    // Send request
    let ccifId = new CcifIdentifier(args.id);
    return new CommerceToolsCart(args, createClient, cartMapper.mapCart.bind(cartMapper))
        .byId(ccifId.getCommerceToolsId())
        .postCartData(args.id, data);
}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(postCoupon);