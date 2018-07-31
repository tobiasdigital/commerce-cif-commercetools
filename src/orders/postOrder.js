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
const CommerceToolsCartOrder = require('./CommerceToolsCartOrder');
const createClient = require('@commercetools/sdk-client').createClient;
const OrderMapper = require('./OrderMapper');
const ERROR_TYPE = require('./constants').ERROR_TYPE;
/**
 * This action creates an order based on a cart.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.cartId               cart id from which the order is created
 */
function postOrder(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    validator
        .checkArguments()
        .mandatoryParameter('cartId');
    if (validator.error) {
        return validator.buildErrorResponse();
    }

    let orderMapper = new OrderMapper();

    const cartOrderClient = new CommerceToolsCartOrder(args, createClient, orderMapper.mapOrder.bind(orderMapper));
    return cartOrderClient.postOrder(args.cartId).then(result => {
        if (result.response.statusCode === 200) {
            result.response.statusCode = 201;
            result.response.headers = {'Location': `orders/${result.response.body.id}`};
        }
        return Promise.resolve(result);
    });
}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(postOrder);

