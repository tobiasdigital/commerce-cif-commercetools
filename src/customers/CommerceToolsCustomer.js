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
 * Commerce Tools customer API implementation.
 */
class CommerceToolsCustomer extends CommerceToolsClientBase {

    /**
     * Builds a customer client for Commerce Tools
     *
     * @param args                      parameters as received from open whisk
     * @param createClient {Function}   commerce tool's createClient function builder
     * @param customerMapper {Function} commerce tools cif customer mapper handler
     */
    constructor(args, createClient, customerMapper) {
        super(args, createClient, customerMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.customers;
    }

    /**
     * Returns a customer based on the request builder configured in the action.
     * @return {*}
     */
    get() {
        return this._handle(this._buildBaseUrl(), 'GET');
    }
}

module.exports = CommerceToolsCustomer;