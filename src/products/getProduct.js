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
const CommerceToolsProduct = require('./CommerceToolsProduct');
const ProductMapper = require('./ProductMapper');
const ERROR_TYPE = require('./constants').ERROR_TYPE;
const LanguageParser = require('@adobe/commerce-cif-commercetools-common/LanguageParser');

/**
 * This action retrieves commerceTools product data by the internal product id or sku.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 * @param   {string} args.id                   the internal product id
 *
 * @return {Promise.<Product, Error>}          The product object
 */
function getProduct(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    const error = validator
        .checkArguments()
        .mandatoryParameter('id')
        .error;
    if (error) {
        return validator.buildErrorResponse();
    }

    let id = args.id;

    // strip the last part of the id, if we have a product variant id
    if (id.length > 36 && id.lastIndexOf('-') == 36) {
        id = id.substring(0, 36);
    }

    let languageParser = new LanguageParser(args);
    let productMapper = new ProductMapper(languageParser);

    const commerceToolsProduct = new CommerceToolsProduct(args, createClient, productMapper.mapProduct.bind(productMapper));

    // expand productType is needed to retrieve the attribute product attribute definitions and axis map
    return commerceToolsProduct
        .byId(id)
        .expand('productType')
        .get();

}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(getProduct);
