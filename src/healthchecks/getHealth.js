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
const createClient = require('@commercetools/sdk-client').createClient;
const CommerceToolsHealthcheck = require('./CommerceToolsHealthcheck');
const logger = require('@adobe/commerce-cif-commercetools-common/logger');

function getHealth(args) {
    const commerceToolsHealth = new CommerceToolsHealthcheck(args, createClient);
    logger.info('Checking commerce backend service health...');

    const response = {
        'Content-Type': 'application/json'
    };

    const buildErrorResponse = body => {
        return Object.assign({}, response, { body, statusCode: 503 });
    };

    const buildSuccessResponse = body => {
        return Object.assign({}, response, { body });
    };

    return commerceToolsHealth
        .checkHealth()
        .then(result => {
            logger.info(JSON.stringify(result));
            return buildSuccessResponse(result);
        })
        .catch(err => {
            logger.info(JSON.stringify(err));
            return buildErrorResponse(err);
        });
}

module.exports.main = getHealth;
