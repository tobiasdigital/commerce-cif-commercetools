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
 * Commerce Tools customer login API implementation.
 */
class CommerceToolsCustomerLogin extends CommerceToolsClientBase {

    /**
     * Builds a customer client login for Commerce Tools
     *
     * @param args                           parameters as received from open whisk
     * @param createClient {Function}        commerce tool's createClient function builder
     * @param customerLoginMapper {Function} commerce tools cif customer login mapper handler
     */
    constructor(args, createClient, customerLoginMapper) {
        super(args, createClient, customerLoginMapper, ERROR_TYPE);
    }

    /**
     * Performs a user login and return the customer info.
     * @return {*}
     */
    login(data) {
        const url = this.requestBuilder.project.build() + 'login';
        //remove the cookie to enable auth middleware with password flow
        delete this.args.__ow_headers['cookie'];
        return this._handle(url, 'POST', data);
    }

}

module.exports = CommerceToolsCustomerLogin;

