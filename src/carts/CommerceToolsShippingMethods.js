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

const CommerceToolsClientBase = require('@adobe/commerce-cif-commercetools-common/CommerceToolsClientBase');
const CcifIdentifier = require('@adobe/commerce-cif-commercetools-common/CcifIdentifier');
const ERROR_TYPE = require('./constants').ERROR_TYPE;
/**
 * Commerce Tools shipping methods API implementation.
 */
class CommerceToolsShippingMethods extends CommerceToolsClientBase {

    /**
     * Builds a shipping methods client for Commerce Tools
     *
     * @param args                              parameters as received from open whisk
     * @param createClient {Function}           commerce tool's createClient function builder
     * @param shippingMethodsMapper {Function}  commerce tools cif shipping methods mapper handler
     */
    constructor(args, createClient, shippingMethodsMapper) {
        super(args, createClient, shippingMethodsMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.shippingMethods;
        this.responseArgs.cacheControl = 'no-cache, no-store, no-transform, must-revalidate';
    }

    /**
     * Requests a list of available shipping methods by cart id.
     *
     * @param cartId           The cart id.
     * @return {Array}         Array of CCIF shipping method objects.
     */
    getByCartId(cartId) {
        let ccifId = new CcifIdentifier(cartId);
        const baseUrl = this._buildBaseUrl() + "?cartId=" + ccifId.getCommerceToolsId();
        return this._handle(baseUrl, 'GET');
    }
}

module.exports = CommerceToolsShippingMethods;