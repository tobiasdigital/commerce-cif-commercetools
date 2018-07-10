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

const HttpStatusCodes = require('http-status-codes');

/**
 * Commerce Tools cart Errors.
 */
class Error {

    static CUSTOMER_NOT_ALLOWED_ERROR() {
        return {
            code: HttpStatusCodes.FORBIDDEN,
            message: 'Cart entry operation is not allowed without valid customer id.'
        };
    }

    static PAYMENT_ALREADY_SET_ERROR() {
        return {
            code: HttpStatusCodes.BAD_REQUEST,
            message: 'Cart payment already exists.'
        };
    }

    static PAYMENT_UNSET_ERROR() {
        return {
            code: HttpStatusCodes.BAD_REQUEST,
            message: 'No cart payment.'
        };
    }

}

module.exports = Error;