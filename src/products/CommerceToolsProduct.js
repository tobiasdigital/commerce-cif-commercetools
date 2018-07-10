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
const ERROR_TYPE = require('./constants').ERROR_TYPE;


/**
 * Commerce Tools product API implementation.
 */
class CommerceToolsProduct extends CommerceToolsClientBase {

    /**
     * Builds a product client for Commerce Tools
     *
     * @param args                      parameters as received from open whisk
     * @param createClient {Function}   commerce tool's createClient function builder
     * @param productMapper {Function}  commerce tools cif product mapper handler
     */
    constructor(args, createClient, productMapper) {
        super(args, createClient, productMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.productProjections;
    }

    /**
     * Returns the product based on the request builder configured in the action.
     * @return {*}
     */
    get() {
        return this._handle(this._buildBaseUrl(), 'GET');
    }

}

module.exports = CommerceToolsProduct;