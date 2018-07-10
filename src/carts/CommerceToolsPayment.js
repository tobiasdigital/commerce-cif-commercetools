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
 * Commerce Tools payment API implementation.
 */
class CommerceToolsPayment extends CommerceToolsClientBase {

    /**
     * Builds a payment client for Commerce Tools
     *
     * @param args                      parameters as received from open whisk
     * @param createClient {Function}   commerce tool's createClient function builder
     * @param paymentMapper {Function} commerce tools cif payment mapper handler
     */
    constructor(args, createClient, paymentMapper) {
        super(args, createClient, paymentMapper, ERROR_TYPE);
        this.requestBuilder = this.requestBuilder.payments;
    }

    /**
     * POST data on the payments request builder. Used to create and update a payment.
     * @return {Promise}
     */
    post(data) {
        return this._handle(this._buildBaseUrl(), 'POST', data);
    }

    /**
     * DELETE the payment. Used to create and update a payment.
     *
     * @param {id}          payment id to be deleted
     * @return {Promise}
     */
    delete(id, paymentVersion) {
        this.requestBuilder.byId(id);
        let baseUrl = this._buildBaseUrl() + `?version=` + paymentVersion;
        return this._handle(baseUrl, 'DELETE');
    }
}

module.exports = CommerceToolsPayment;