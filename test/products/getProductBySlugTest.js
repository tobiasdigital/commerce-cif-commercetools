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

describe('commercetools getProductBySlug', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'getProductBySlug');

        let args = {
            slug: 'meskwielt',
            __ow_headers: {
                'accept-language': 'en'
            }
        };

        it('Test getProductBySlug with valid slug', () => {
            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/product-projections?expand=productType&where=slug(en%3D%22meskwielt%22)`,
                method: 'GET',
                headers: undefined
            }];

            // The "search by slug" in CT returns a paged response, so we "simulate" this here
            let searchResponse = {
                body: {
                    count: 1,
                    results: [
                        sampleProduct1.body
                    ]
                }
            };

            return this.prepareResolve(searchResponse, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);
                // check product
                let product = result.response.body;
                assert.strictEqual(product.slug, args.slug, 'Product slug does not match');
            });
        });

        it('Test validator error when slug argument is missing', () => {
            return this.prepareResolve(null).execute({id: '526dc571-104f-XXXX-b761-71781a97910b'}).then(result => {
                assert.strictEqual(result.response.error.name, 'MissingPropertyError');
            });
        });

        it('Test product not found', () => {
            let searchResponse = {
                body: {
                    count: 0,
                    results: []
                }
            };
            return this.prepareResolve(searchResponse).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                assert.strictEqual(result.response.error.message, "Could not find a product with slug 'meskwielt' and language tag 'en'");
            });
        });

        it('Test search returned more than one match', () => {
            let searchResponse = {
                body: {
                    count: 2,
                    results: []
                }
            };
            return this.prepareResolve(searchResponse).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceBadRequestError');
                assert.strictEqual(result.response.error.message, "The request with slug 'meskwielt' matches multiple products");
            });
        });
    });
});