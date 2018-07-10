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

const createClient = require('@commercetools/sdk-client').createClient;
const CTPerformanceMeasurement = require('@adobe/commerce-cif-commercetools-common/performance-measurement.js');
const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const CommerceToolsCustomerLogin = require('./CommerceToolsCustomerLogin');
const customerMapper = require('./CustomerMapper');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * This action performs a user login.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 * @param   {string} args.email                the email address of the customer
 * @param   {string} args.password             the password for the customer
 * @param   {string} args.anonymousCartId      the id of the current anonymous cart (if any)
 *
 * @return  {LoginResult}                      a LoginResult object
 */
function login(args) {

    const validator = new InputValidator(args, ERROR_TYPE);

    validator.checkArguments()
             .mandatoryParameter('email')
             .mandatoryParameter('password');

    if (validator.error) {
        return validator.buildErrorResponse();
    }

    const data = {
        email: args.email,
        password: args.password
    };

    if (args.anonymousCartId) {
        data.anonymousCartId = args.anonymousCartId;
    }

    const commerceToolsCustomer = new CommerceToolsCustomerLogin(args, createClient, customerMapper.mapCustomerLogin);
    return commerceToolsCustomer.login(data);

}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(login);