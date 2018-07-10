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
 * Commerce Tools orders API implementation.
 */
class CommerceToolsOrder extends CommerceToolsClientBase {

    /**
     * Builds an order client for Commerce Tools
     *
     * @param args                      parameters as received from open whisk
     * @param createClient {Function}   commerce tool's createClient function builder
     * @param orderMapper {Function}    commerce tools cif order mapper handler
     */
    constructor(args, createClient, orderMapper) {
        super(args, createClient, orderMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.orders;
    }

    /**
     * POST data on the orders request builder.
     * @return {Promise}
     */
    post(data) {
        return this._handle(this._buildBaseUrl(), 'POST', data);
    }

}

module.exports = CommerceToolsOrder;