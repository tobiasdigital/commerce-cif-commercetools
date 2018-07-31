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
const sampleCategories = require('../resources/sample-categories');
const config = require('../lib/config').config;

describe('commercetools getCategories', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'getCategories');

        it('Test get category by id', () => {
            let args = {
                id: '693b0fc5-7283-4673-a362-589d37fb7b73',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/categories/693b0fc5-7283-4673-a362-589d37fb7b73`,
                method: 'GET',
                headers: undefined
            }];
            let category = sampleCategories.body.results.filter(cat => cat.id === args.id)[0];
            return this.prepareResolve({body: category}, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let category = result.response.body;
                assert.strictEqual(args.id, category.id, 'The category id does not match');
            });
        });

        it('Test "flat" getCategories with full we.retail catalog', () => {
            let args = {
                type: 'flat',
                sort: 'id.asc|name.desc',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            
            const expectedArgs = [{
                uri:  `/${config.CT_PROJECTKEY}/categories?limit=50&offset=0&sort=id%20asc&sort=name.en%20desc`,
                method: 'GET',
                headers: undefined
            }];
            return this.prepareResolve(sampleCategories, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let pagedResponse = result.response.body;
                assert.strictEqual(sampleCategories.body.offset, pagedResponse.offset, 'Result offset does not match');
                assert.strictEqual(sampleCategories.body.count, pagedResponse.count, 'Result count does not match');
                assert.strictEqual(sampleCategories.body.total, pagedResponse.total, 'Result total does not match');
                assert.strictEqual(sampleCategories.body.count, pagedResponse.results.length,
                                   'Results size does not match');

                let categoryIds = pagedResponse.results.map(cat => cat.id);
                sampleCategories.body.results.forEach(cat => {
                    assert.isTrue(categoryIds.includes(cat.id),
                                  'The results do not contain all the expected category ids');
                });
            });
        });

        it('Test "tree" getCategories with full we.retail catalog', () => {
            let args = {
                type: 'tree',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri:  `/${config.CT_PROJECTKEY}/categories?limit=50&offset=0`,
                method: 'GET',
                headers: undefined
            }];
            return this.prepareResolve(sampleCategories, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let pagedResponse = result.response.body;
                assert.strictEqual(sampleCategories.body.offset, pagedResponse.offset, 'Result offset does not match');
                assert.strictEqual(sampleCategories.body.count, pagedResponse.count, 'Result count does not match');
                assert.strictEqual(sampleCategories.body.total, pagedResponse.total, 'Result total does not match');

                let expectedResultsSize = sampleCategories.body.results.filter(cat => !cat.parent).length;
                assert.strictEqual(expectedResultsSize, pagedResponse.results.length,
                                   'The number of root categories does not match');

                let expectedFirstLevelSize = sampleCategories.body.results.filter(
                    cat => cat.ancestors && cat.ancestors.length == 1).length;
                let levelOneCategories = 0;
                pagedResponse.results.forEach(cat => levelOneCategories += cat.children.length);
                assert.strictEqual(expectedFirstLevelSize, levelOneCategories,
                                   'The number of level 1 categories does not match');
            });
        });

        it('Test getCategories with "depth" parameter', () => {
            let args = {
                type: 'flat',
                depth: '0',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/categories?limit=50&offset=0`,
                method: 'GET',
                headers: undefined
            }];
            return this.prepareResolve(sampleCategories, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);

                let expectedResultsSize = sampleCategories.body.results.filter(cat => !cat.parent).length;
                let pagedResponse = result.response.body;

                assert.strictEqual(sampleCategories.body.offset, pagedResponse.offset, 'Result offset does not match');
                assert.strictEqual(expectedResultsSize, pagedResponse.count, 'Result count does not match');
                assert.strictEqual(sampleCategories.body.total, pagedResponse.total, 'Result total does not match');
                assert.strictEqual(expectedResultsSize, pagedResponse.results.length,
                                   'The number of root categories does not match');
            });
        });

        it('Test category not found with backend message', () => {
            let args = {id: '526dc571-104f-XXXX-b761-71781a97910b'};
            let errorMsg = 'The Resource with ID \'526dc571-104f-XXXX-b761-71781a97910b\' was not found.';
            return this.prepareReject({code: 404, body: {message: errorMsg}}).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                assert.strictEqual(result.response.error.message, 'CommerceTools resource not found',
                                   'HTTP error message does not match');
            });
        });

        it('Test category not found with default message', () => {
            let args = {id: '526dc571-104f-XXXX-b761-71781a97910b'};
            return this.prepareReject({code: 404}).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                //assert.strictEqual(result.response.error.message, 'Category not found', 'HTTP error message does' +
                //                                                                          ' not' +
                //                                                                    ' match');
            });
        });

        it('returns an error for invalid paging parameters', () => {
            let args = {
                limit: -1
            };
            return this.execute(args).then(function(result) {
                assert.isDefined(result.response.error);
                assert.strictEqual(result.response.error.name, 'InvalidArgumentError');
                assert.isDefined(result.response.errorType);
            })
        });
    });
});

