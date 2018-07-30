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

const assert = require('chai').assert;
const setup = require('../lib/setupTest').setup;
const sampleProduct1 = require('../resources/sample-product1');
const config = require('../lib/config').config;
const sampleProductSearch = require('../resources/sample-product-search');

describe('commercetools searchProducts', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'searchProducts');

        it('Test searchProduct with full we.retail product', () => {
            let id = '526dc571-104f-40fb-b761-71781a97910b';
            let args = {
                filter: `id:"${id}"`,
                text: 'coat',
                limit: 5,
                offset: 10,
                sort: 'name.desc|variants.sku',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };

            const expectedArgs = {
                uri: `/${config.CT_PROJECTKEY}/product-projections/search?expand=productType&limit=5&offset=10&sort=name.en%20desc&sort=variants.sku%20asc&text.en=coat&markMatchingVariants=false&filter.query=id%3A%22526dc571-104f-40fb-b761-71781a97910b%22`,
                method: 'GET',
                headers: undefined
            };

            let response = {body: {offset: 10, count: 1, total: 11, results: [sampleProduct1.body]}};
            return this.prepareResolve(response, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let pagedResponse = result.response.body;
                assert.strictEqual(10, pagedResponse.offset, 'Search offset does not match');
                assert.strictEqual(1, pagedResponse.count, 'Search count does not match');
                assert.strictEqual(11, pagedResponse.total, 'Search total does not match');
                assert.strictEqual(1, pagedResponse.results.length, 'Search results size does not match');

                let product = pagedResponse.results[0];
                assert.strictEqual(id, product.id, 'Product identifier does not match');
            });
        });

        it('Test searchProduct with missing mandatory arguments', () => {
            let args = {
                filter: '',
                text: undefined,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };

            return this.execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
                assert.strictEqual(result.response.error.message,
                    'At least one parameter from [filter, text] must be specified.');
            });
        });

        it('Test searchProduct with auto query facets', () => {
            let args = {
                productTypeId: '526dc571-104f-40fb-b761-71781a97910b',
                text: 'jacket',
                limit: 5,
                offset: 10,
                sort: 'name.desc|variants.sku',
                queryFacets: 'auto',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };

            const expectedArgs = [{
                uri: encodeURI(
                    `/${config.CT_PROJECTKEY}/product-projections/search?expand=productType&limit=1&text.en=jacket&markMatchingVariants=false`),
                method: 'GET',
                headers: undefined
            }, {
                uri: `/${config.CT_PROJECTKEY}/product-projections/search?expand=productType&limit=5&offset=10&sort=name.en%20desc&sort=variants.sku%20asc&text.en=jacket&markMatchingVariants=false&facet=variants.attributes.color.en%20counting%20products&facet=variants.attributes.size.en%20counting%20products&facet=variants.attributes.designer.en%20counting%20products&facet=variants.attributes.colorFreeDefinition.en%20counting%20products&facet=variants.attributes.test.en%20counting%20products&facet=categories.id%20counting%20products&facet=variants.prices.value.centAmount%20counting%20products`,
                method: 'GET',
                headers: undefined
            }];

            let mockedResponses = [];
            //this needs to be in the same order as the expected Args.
            mockedResponses.push(sampleProductSearch);
            mockedResponses.push(sampleProductSearch);

            //let response = {body: {offset: 10, count: 1, total: 11, results: sampleProductSearch.body.results}};
            return this.prepareResolveMultipleResponse(mockedResponses, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response.body.facets);
                result.response.body.facets.forEach(facet => {
                    assert.isDefined(facet.name)
                    facet.facetValues.forEach(facetValue => {
                        assert.isDefined(facetValue.id);
                        assert.equal(facetValue.id, `${facet.name}.${facetValue.value}`);
                        assert.isDefined(facetValue.value);
                        assert.isDefined(facetValue.occurrences);
                    });
                });
            });
        });

        it('Test searchProduct with color query facets', () => {
            let args = {
                productTypeId: '526dc571-104f-40fb-b761-71781a97910b',
                text: 'jacket',
                limit: 5,
                offset: 10,
                sort: 'name.desc|variants.sku',
                queryFacets: 'variants.attributes.color.en',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };

            const expectedArgs = {
                uri: `/${config.CT_PROJECTKEY}/product-projections/search?expand=productType&limit=5&offset=10&sort=name.en%20desc&sort=variants.sku%20asc&text.en=jacket&markMatchingVariants=false&facet=variants.attributes.color.en%20counting%20products`,
                method: 'GET',
                headers: undefined
            };

            delete sampleProductSearch.body.facets["variants.prices.value.centAmount"];

            return this.prepareResolve(sampleProductSearch, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response.body.facets);
                assert.strictEqual(result.response.body.facets.length, 1);
                let colorFacet = result.response.body.facets[0];
                assert.strictEqual(colorFacet.type, 'text');
                colorFacet.facetValues.forEach(facetValue => {
                    assert.isDefined(facetValue.id);
                    assert.equal(facetValue.id, `${colorFacet.name}.${facetValue.value}`);
                    assert.isDefined(facetValue.value);
                    assert.isDefined(facetValue.occurrences);
                });

            });
        });

        it('Test searchProduct with color query facets & purple facet', () => {
            let args = {
                productTypeId: '526dc571-104f-40fb-b761-71781a97910b',
                text: 'jacket',
                limit: 5,
                offset: 10,
                sort: 'name.desc|variants.sku',
                queryFacets: 'variants.attributes.color.en',
                selectedFacets: 'variants.attributes.color.en:"purple"',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };

            const expectedArgs = {
                uri: `/${config.CT_PROJECTKEY}/product-projections/search?expand=productType&limit=5&offset=10&sort=name.en%20desc&sort=variants.sku%20asc&text.en=jacket&markMatchingVariants=false&facet=variants.attributes.color.en%20counting%20products&filter=variants.attributes.color.en%3A%22purple%22`,
                method: 'GET',
                headers: undefined
            };

            delete sampleProductSearch.body.facets["variants.prices.value.centAmount"];

            return this.prepareResolve(sampleProductSearch, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response.body.facets);
                assert.strictEqual(result.response.body.facets.length, 1);
                let colorFacet = result.response.body.facets[0];
                assert.strictEqual(colorFacet.type, 'text');
                colorFacet.facetValues.forEach(facetValue => {
                    assert.isDefined(facetValue.id);
                    assert.equal(facetValue.id, `${colorFacet.name}.${facetValue.value}`);
                    assert.isDefined(facetValue.value);
                    assert.isDefined(facetValue.occurrences);
                    if (facetValue.value === 'purple') {
                        assert.strictEqual(facetValue.selected, true);
                    } else {
                        assert.isUndefined(facetValue.selected);
                    }
                });
            });
        });

        it('returns an error for invalid paging parameters', () => {
            let args = {
                text: 'jacket',
                limit: -1,
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            return this.execute(args).then(function(result) {
                assert.isDefined(result.response.error);
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
                assert.isDefined(result.response.errorType);
            })
        });

    });
});

