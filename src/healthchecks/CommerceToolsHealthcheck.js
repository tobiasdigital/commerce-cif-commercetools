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

"use strict";

const CommerceToolsClientBase = require("@adobe/commerce-cif-commercetools-common/CommerceToolsClientBase");

class CommerceToolsHealthcheck extends CommerceToolsClientBase {
    constructor(args, createClient) {
        super(args, createClient);
        this.requestBuilder = this.requestBuilder.project;
    }

    checkHealth() {
        let hrstart = process.hrtime();
        return this._execute(this._buildBaseUrl(), "GET")
            .then(() => {
                let duration = process.hrtime(hrstart);
                let response = {
                    reports: [{
                        scope: "general",
                        healthy: true,
                        message: `Response time: ${duration[1] / 1000000}ms`
                    }]
                };

                return Promise.resolve(response);
            })
            .catch(err => {
                let response = {
                    reports: [{
                        scope: "general",
                        healthy: false,
                        message: err.message
                    }]
                };
                return Promise.reject(response);
            });
    }
}
module.exports = CommerceToolsHealthcheck;