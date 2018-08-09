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
 * @param   {string} args.id                   cart id; when empty a new cart will be created
 * @param   {string} args.currency             cart entry selected currency
 * @param   {string} args.productVariantId     id of the product variant
 * @param   {string} args.quantity             quantity for the product variant
 */
function postCartEntry(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    const id = args.id;
    const currency = args.currency || 'USD';
    const quantity = parseFloat(args.quantity);
    let productId = null;
    let variantId = null;

    let languageParser = new LanguageParser(args);
    let cartMapper = new CartMapper(languageParser);

    const cart = new CommerceToolsCart(args, createClient, cartMapper.mapCart.bind(cartMapper));

    const ActionStateEnum = {
        NEW_EMPTY_CART: 0,
        NEW_CART_AND_ENTRY: 1,
        ADD_ENTRY_2_CART: 2
    };

    let actionState = ActionStateEnum.NEW_EMPTY_CART;

    if (typeof args.productVariantId !== 'undefined' && args.productVariantId) {
        actionState = ActionStateEnum.NEW_CART_AND_ENTRY;
    }
    if (typeof id !== 'undefined' && id) {
        actionState = ActionStateEnum.ADD_ENTRY_2_CART;
    }

    validator.checkArguments();
    if (actionState !== ActionStateEnum.ADD_ENTRY_2_CART) {
        validator.mandatoryParameter('currency');
        validator.isCurrencyCode('currency');
    }
    if (actionState !== ActionStateEnum.NEW_EMPTY_CART) {
        validator.mandatoryParameter('productVariantId');
        validator.mandatoryParameter('quantity');
        validator.matchRegexp('productVariantId', InputValidator.PRODUCT_VARIANT_ID_REGEXP);
        validator.isInteger('quantity');
    }

    if (validator.error) {
        return validator.buildErrorResponse();
    }

    // Safely parse when parameters are valid
    if (actionState !== ActionStateEnum.NEW_EMPTY_CART) {
        const parts = InputValidator.PRODUCT_VARIANT_ID_REGEXP.exec(args.productVariantId);
        productId = parts[1];
        variantId = parseInt(parts[2]);
    }

    let data = {};

    switch (actionState) {
        case ActionStateEnum.NEW_EMPTY_CART:
            data.currency = currency;
            return cart.create(data).then(result => {
                if (result.response.statusCode === 200) {
                    result.response.statusCode = 201;
                    result.response.headers = result.response.headers || {};
                    result.response.headers.Location = `carts/${result.response.body.id}`;
                }
                return Promise.resolve(result);
            });
            
        case ActionStateEnum.ADD_ENTRY_2_CART:
            data.actions = [{
                action: 'addLineItem',
                productId: productId,
                variantId: variantId,
                quantity: quantity
            }];
            return cart.postCartData(id, data).then(result => {
                if (result.response.statusCode === 200) {
                    result.response.statusCode = 201;
                    let entry = result.response.body.entries.find(entry => (entry.productVariant.id === `${productId}-${variantId}`));
                    if (entry) {
                        result.response.headers = result.response.headers || {};
                        result.response.headers.Location = `carts/${id}/entries/${entry.id}`;
                    }
                }
                return Promise.resolve(result);
            });
            
        case ActionStateEnum.NEW_CART_AND_ENTRY:
            data.currency = currency;
            data.lineItems = [{
                productId: productId,
                variantId: variantId,
                quantity: quantity
            }];
            return cart.create(data).then(result => {
                if (result.response.statusCode === 200) {
                    result.response.statusCode = 201;
                    let entry = result.response.body.entries.find(entry => (entry.productVariant.id === `${productId}-${variantId}`));
                    if (entry) {
                        result.response.headers = result.response.headers || {};
                        result.response.headers.Location = `carts/${result.response.body.id}/entries/${entry.id}`;
                    }
                }
                return Promise.resolve(result);
            });
    }
}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(postCartEntry);

