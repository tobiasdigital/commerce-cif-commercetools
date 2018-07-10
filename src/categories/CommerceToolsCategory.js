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
 * Commerce Tools category API implementation.
 */
class CommerceToolsCategory extends CommerceToolsClientBase {

    /**
     * Builds a category client for Commerce Tools
     *
     * @param args                      parameters as received from open whisk
     * @param createClient {Function}   commerce tool's createClient function builder
     * @param categoryMapper {Function} commerce tools cif category mapper handler
     */
    constructor(args, createClient, categoryMapper) {
        super(args, createClient, categoryMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.categories;
    }

    /**
     * Sets the mapper arguments and executes the parameterized search.
     * @param type     defines if the request should return either a flat or tree category structure
     * @param depth    defines the maximum depth of the returned categories
     * @return {*}
     */
    getCategories(type, depth) {
        this.mapperArgs.push(type);
        this.mapperArgs.push(depth);
        return this._handle(this._buildBaseUrl(), 'GET');
    }
}

module.exports = CommerceToolsCategory;