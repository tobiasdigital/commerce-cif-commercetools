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
const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const CommerceToolsProductSearch = require('./CommerceToolsProductSearch');
const productMapper = require('./ProductMapper');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * This action searches commerceTools product data (product projections) based on search and filter criteria.
 *
 * @param   {string} args.CT_PROJECTKEY        commerceTools project key
 * @param   {string} args.CT_CLIENTID          commerceTools client id
 * @param   {string} args.CT_CLIENTSECRET      commerceTools client secret
 * @param   {string} args.CT_API_HOST          optional commerceTools API host uri
 * @param   {string} args.CT_AUTH_HOST         optional commerceTools AUTH host uri
 *
 * @param   {string} args.text                 a string which should be used to perform a full-text search
 * @param   {string} args.filter               a string of search filters separated by the '|' (pipe) character
 * @param   {string} args.limit                the maximum number of results that should be returned
 * @param   {string} args.offset               the number of products to skip when returning the result
 * @param   {string} args.sort                 a string of sort directives separated by the '|' (pipe) character
 * @param   {string} queryFacets               a string of facets to be calculated separated by the '|' (pipe) character
 * @param   {string} selectedFacets            a string of facets to be used as filters separated by the '|' (pipe) character
 *
 * @return  {Promise.<PagedResponse>}          a paged response object
 */
function searchProducts(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    let error = validator
        .checkArguments()
        .atLeastOneParameter(['filter', 'text'])
        .error;

    if (error) {
        return validator.buildErrorResponse();
    }

    let filters = args.filter ? args.filter.split('|') : [];
    let sorts = args.sort ? args.sort.split('|') : [];
    let selectedFacets = args.selectedFacets ? args.selectedFacets.split('|') : [];
    let queryFacets = args.queryFacets ? args.queryFacets.split('|') : [];

    let text = args.text;
    let language = args.language || 'en';
    let staged = args.staged || false;
    let limit = Number(args.limit) || 25;
    let offset = Number(args.offset) || 0;

    const commerceToolsProductSearch = new CommerceToolsProductSearch(args, createClient, productMapper.mapPagedProductResponse);
    const commerceToolsFacetSearch = new CommerceToolsProductSearch(args, createClient, productMapper.getProductFacets);

    _setQueryCriteria(commerceToolsProductSearch, language, text, filters, selectedFacets, sorts);

    if (queryFacets.length === 1 && queryFacets[0] === 'auto') {
        _setQueryCriteria(commerceToolsFacetSearch, language, text, [], [], []);
        return commerceToolsFacetSearch.perPage(1).expand('productType').search().then(result => {
            if (result.response.statusCode !== 200) {
                return result;
            }
            result.response.body.map(facet => {
                //by default CommerceTools facet count is for product variant; including option 'counting products' to
                //get facet count for product as well. 
                commerceToolsProductSearch.facet(`${facet.name} counting products`)
            });
            return _executeSearch(commerceToolsProductSearch, limit, offset, staged);
        });
    } else {
        queryFacets.forEach(facet => {
            commerceToolsProductSearch.facet(`${facet} counting products`)
        });
        return _executeSearch(commerceToolsProductSearch, limit, offset, staged);
    }
}

function _executeSearch(commerceToolsProductSearch, limit, offset, staged) {
    return commerceToolsProductSearch
        .perPage(limit)
        .page(offset > 0 ? (offset / limit + 1) : 1)
        .staged(staged)
        .expand('productType')
        .search();
}

function _setQueryCriteria(client, language, text, filters, selectedFacets, sorts) {
    //apply regular filter
    filters.forEach(filter => client.filterByQuery(filter));
    //apply facets filter
    selectedFacets.forEach(facet => client.filter(facet));
    // full-text search
    if (typeof text !== 'undefined' && text !== null) {
        client.text(text, language);
    }
    // sort orders
    for (let s in sorts) {
        let sort = sorts[s];
        if (sort.endsWith('.asc')) {
            client.sort(sort.slice(0, -4), true);
        } else if (sort.endsWith('.desc')) {
            client.sort(sort.slice(0, -5), false);
        } else {
            client.sort(sort, true);
        }
    }
}

module.exports.main = CTPerformanceMeasurement.decorateActionForSequence(searchProducts);