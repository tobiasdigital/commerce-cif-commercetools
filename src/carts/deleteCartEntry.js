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
const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const CommerceToolsCart = require('./CommerceToolsCart');
const createClient = require('@commercetools/sdk-client').createClient;
const CartMapper = require('./CartMapper');
const LanguageParser = require('@adobe/commerce-cif-commercetools-common/LanguageParser');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * This action adds a new entry to a cart. When the cart id is empty a new cart will be created with the new cart entry.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.id                   cart id
 * @param   {string} args.cartEntryId          cart entry id
 * @param   {string} args.customerId           an optional customer id to check that cart operations are permitted
 *
 * @return  {Promise}                          the cart containing the remaining cart entries
 */
function deleteCartEntry(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    validator
        .checkArguments()
        .mandatoryParameter('id')
        .mandatoryParameter('cartEntryId')
        .matchRegexp('cartEntryId', InputValidator.CART_ENTRY_ID_REGEXP);
    if (validator.error) {
        return validator.buildErrorResponse();
    }

    let languageParser = new LanguageParser(args);
    let cartMapper = new CartMapper(languageParser);

    const cart = new CommerceToolsCart(args, createClient, cartMapper.mapCart.bind(cartMapper));
        // cart data for cart remove action
        const data = {
            actions: [
                {
                    action: 'removeLineItem',
                    lineItemId: args.cartEntryId
                }
            ]
        };
    return cart.postCartData(args.id, data, args.customerId);

}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(deleteCartEntry);
