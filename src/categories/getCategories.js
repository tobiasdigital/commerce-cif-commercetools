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
const CTPerformanceMeasurement = require('@adobe/commerce-cif-commercetools-common/performance-measurement.js');
const CommerceToolsCategory = require('./CommerceToolsCategory');
const categoryMapper = require('./CategoryMapper');

/**
 * This action returns the entire category structure, a given category, or a subset of the categories depending on pagination.
 * While the parameters 'limit', 'offset', and 'depth' are integers, they should be passed as strings because they are
 * typically parsed from HTTP query parameters.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.id                   an optional category id
 * @param   {string} args.type                 defines if the request should return either a flat or tree category structure
 * @param   {string} args.limit                the maximum number of results that should be returned
 * @param   {string} args.offset               the number of categories to skip when returning the result
 * @param   {string} args.sort                 a string of sort directives separated by the ',' (comma) character
 * @param   {string} args.depth                defines the maximum depth of the returned categories
 * @return  {Promise.<PagedResponse>}          a paged response object or Category if a category id was set in the request
 */
function getCategories(args) {
    let id = args.id;
    let limit = (args.limit && !Number.isNaN(args.limit)) ? Number(args.limit) : 50;
    let offset = (args.offset && !Number.isNaN(args.offset)) ? Number(args.offset) : 0;
    let depth = (args.depth && !Number.isNaN(args.depth)) ? Number(args.depth) : - 1;
    let type = args.type || 'flat';
    let sorts = args.sort ? args.sort.split('|') : [];

    const categories = new CommerceToolsCategory(args, createClient, args.id ? categoryMapper.mapCategory : categoryMapper.mapPagedCategoryResponse);
    if (id) {
        categories.byId(id);
    }
    else {
        categories.perPage(limit);
        categories.page(offset > 0 ? ((offset / limit) + 1) : 1);
    }

    // sort orders
    for (let s in sorts) {
        let sort = sorts[s];
        if (sort.endsWith('.asc')) {
            categories.sort(sort.slice(0, -4), true);
        } else if (sort.endsWith('.desc')) {
            categories.sort(sort.slice(0, -5), false);
        } else {
            categories.sort(sort, true);
        }
    }
    
    return categories.getCategories(type, depth);
}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(getCategories);
