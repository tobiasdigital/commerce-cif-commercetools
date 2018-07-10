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

let PerformanceMeasurement = require('@adobe/commerce-cif-common/performance-measurement.js');

class CTPerformanceMeasurement extends PerformanceMeasurement {

    /**
     * Wraps a CommerceTools client and adds logic for performance measurement.
     * When a client is wrapped, the execute time of requests is measured and Perf-Ct-Req-Out and Perf-Ct-Resp-In headers
     * are set. Headers are added only when performance measurement is active (aka Perf-Activate header is sent).
     *
     * @param client An initialized CommerceTools.
     * @returns A client which has the execute function wrapped.
     */
    static decorateCommerceToolsClient(client, args) {
        if (!this.isActive(args)) {
            return client;
        }

        const execute = client.execute;
        const perfActionId = args.__ow_headers[this.const.PERF_ACTION_ID] || args.__ow_headers[this.const.PERF_ACTION_ID.toLowerCase()];
        const apiHost = args.CT_API_HOST;

        client.execute = function (executeArgs) {
            let currentRequestNumber = args.backendRequestCount++;
            CTPerformanceMeasurement.startBackendRequest(Object.assign(args, executeArgs), currentRequestNumber, perfActionId, apiHost);
            return new Promise(function (resolve, reject) {
                execute(executeArgs).then(function (result) {
                    CTPerformanceMeasurement.endBackendRequest(args, currentRequestNumber, perfActionId);
                    resolve(result);
                }).catch(function (error) {
                    CTPerformanceMeasurement.endBackendRequest(args, currentRequestNumber, perfActionId);
                    reject(error);
                });
            });
        };
        return client;
    }

}

module.exports = CTPerformanceMeasurement;