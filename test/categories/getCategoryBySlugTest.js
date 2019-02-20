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

describe('commercetools getCategoryBySlug', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'getCategoryBySlug');

        let args = {
            slug: 'men-1488302486868',
            __ow_headers: {
                'accept-language': 'en'
            }
        };

        it('Test getCategoryBySlug with valid slug', () => {
            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/categories?where=slug(en%3D%22men-1488302486868%22)`,
                method: 'GET',
                headers: undefined
            }];

            // The "search by slug" in CT returns a paged response, so we "simulate" this here
            let searchResponse = {
                body: {
                    count: 1,
                    results: [
                        sampleCategories.body.results.find(c => c.slug.en == args.slug)
                    ]
                }
            };

            return this.prepareResolve(searchResponse, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);
                // check category
                let category = result.response.body;
                assert.strictEqual(category.slug, args.slug, 'Category slug does not match');
            });
        });

        it('Test validator error when slug argument is missing', () => {
            return this.prepareResolve(null).execute({id: 'whatever'}).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Test category not found', () => {
            let searchResponse = {
                body: {
                    count: 0,
                    results: []
                }
            };
            return this.prepareResolve(searchResponse).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                assert.strictEqual(result.response.error.message, "Could not find a category with slug 'men-1488302486868' and language tag 'en'");
            });
        });

        it('Test search returned more than one match', () => {
            return this.prepareResolve(sampleCategories).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceBadRequestError');
                assert.strictEqual(result.response.error.message, "The request with slug 'men-1488302486868' matches multiple categories");
            });
        });
    });
});