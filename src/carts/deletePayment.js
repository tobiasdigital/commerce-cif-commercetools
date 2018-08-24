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

const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const CommerceToolsCartPayment = require('./CommerceToolsCartPayment');
const createClient = require('@commercetools/sdk-client').createClient;
const LanguageParser = require('@adobe/commerce-cif-commercetools-common/LanguageParser');
const CartMapper = require('./CartMapper');
const PaymentMapper = require('./PaymentMapper');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * This action removes a payment from the cart and from payments.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.id                   cart id;
 *
 */
function deletePayment(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    validator
        .checkArguments()
        .mandatoryParameter('id');
    if (validator.error) {
        return validator.buildErrorResponse();
    }

    let languageParser = new LanguageParser(args);
    let cartMapper = new CartMapper(languageParser);
    let paymentMapper = new PaymentMapper();

    let cartPaymentClient = new CommerceToolsCartPayment(args, createClient, cartMapper.mapCart.bind(cartMapper), paymentMapper.mapPayment.bind(paymentMapper), paymentMapper.mapPaymentDraft.bind(paymentMapper));
    return cartPaymentClient.deletePayment(args.id);
}

module.exports.main = deletePayment;