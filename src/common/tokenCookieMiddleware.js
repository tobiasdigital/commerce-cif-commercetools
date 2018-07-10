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

const CCS_CT_TOKEN = 'ccs-ct-token';

module.exports = {

    extractOauthTokenMiddleware(headers) {
        return function (next) {
            return function (request, response) {

                if (headers && headers['cookie']) {
                    let cookies = headers.cookie.split(';');
                    for (let i = 0, length = cookies.length; i < length; i++) {
                        let parts = cookies[i].trim().split('=');
                        if (parts[0].trim() === CCS_CT_TOKEN) {
                            console.log('CommerceTools Client token extracted from cookie.');
                            request['headers'] = request['headers'] || {};
                            request.headers['Authorization'] = 'Bearer ' + parts[1];
                            request.tokenExtracted = true;
                            break;
                        }
                    }
                }

                next(request, response);
            };
        };
    },

    setOauthTokenMiddleware(httpResponse) {
        return function (next) {
            return function (request, response) {

                // The cookie is only set if the token was not extracted from the initial http request
                if (!request.tokenExtracted && request.headers && request.headers.Authorization) {

                    const token = request.headers.Authorization.substring(7); // without 'Bearer '

                    // TODO: we will have to change the way we pass headers to the WebActionTransformer
                    // to allow having multiple headers with the same name             
                    // TODO: we cannot get the toekn expires_in value from the CT oauth middleware, so we just set one
                    // hour for now
                    httpResponse['headers'] = httpResponse['headers'] || {};
                    httpResponse.headers['Set-Cookie'] = CCS_CT_TOKEN + '=' + token + ';Path=/;Max-Age=3600';
                }

                next(request, response);
            };
        };
    }

};