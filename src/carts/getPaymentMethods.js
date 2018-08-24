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
const ERROR_TYPE = require('./constants').ERROR_TYPE;
const PaymentMethod = require('@adobe/commerce-cif-model').PaymentMethod;

/**
 * @constant
 * @type {Array}
 * CommerceTools doesn't have a way to retrieve a list of payment methods, so we hardcode one here.
 */
const PAYMENT_METHODS = [
    {
        "id": "credit-card",
        "name": "Credit Card",
        "description": "Pay using your credit card"
    }, {
        "id": "bank-transfer",
        "name": "Bank transfer",
        "description": "Pay by bank transfer"
    }
]

/**
 * Generates a CIF PaymentMethod object from a JS object which contains the properties to create one
 * @param {Object} cifPaymentMethod 
 * @returns {PaymentMethod} the resulting object
 */
function _generatePaymentMethod(cifPaymentMethod) {
    let paymentMethod = new PaymentMethod
        .Builder()
        .withId(cifPaymentMethod.id)
        .withName(cifPaymentMethod.name)
        .build();

    paymentMethod.description = cifPaymentMethod.description;
    return paymentMethod;
}

/**
 * Generates a "mock" response compatible with standard CIF responses.
 */
function _generateMockResponse() {
    return {
        response: {
            body: PAYMENT_METHODS.map(_generatePaymentMethod)
        }
    };
}

/**
 * This action gets the available payment methods for a cart that exists in commerce tools.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.id                   the id of a cart
 */
function getPaymentMethods(args) {
    const validator = new InputValidator(args, ERROR_TYPE);

    validator
        .checkArguments()
        .mandatoryParameter('id');
    if (validator.error) {
        return validator.buildErrorResponse();
    }

    return Promise.resolve(_generateMockResponse());
}

module.exports.main = getPaymentMethods;