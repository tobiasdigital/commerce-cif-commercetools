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
 * Commerce Tools cart API implementation.
 */
class CommerceToolsCartVersion extends CommerceToolsClientBase {

    /**
     * Builds a cart client for Commerce Tools
     *
     * @param args                      parameters as received from open whisk
     * @param createClient {Function}   commerce tool's createClient function builder
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     */
    constructor(args, createClient, cartMapper) {
        super(args, createClient, cartMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.carts;
        this.responseArgs.cacheControl = 'no-cache, no-store, no-transform, must-revalidate';
    }

    /**
     * Gets a commerce tools cart by id
     *
     * @param id          Cart id.
     * @return {Request}  CommerceTools response.
     * @protected
     */
    _ctCartById(baseUrl) {
        return this._execute(baseUrl, 'GET');
    }

}

module.exports = CommerceToolsCartVersion;