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

describe('commercetools getProduct', () => {

    describe('Unit tests', () => {

        // build the helper in the context of '.this' suite
        setup(this, __dirname, 'getProduct');

        it('Test getProduct with product id', () => {
            let args = {
                id: '526dc571-104f-40fb-b761-71781a97910b',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/product-projections/526dc571-104f-40fb-b761-71781a97910b?expand=productType`,
                method: 'GET',
                headers: undefined
            }];

            return this.prepareResolve(sampleProduct1, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);
                // check product
                let product = result.response.body;
                assert.isDefined(product.id, 'Property \'id\' is mandatory for product');
                assert.strictEqual(product.id, args.id, 'Product identifier does not match');

                // check variant information
                assert.strictEqual(product.masterVariantId, sampleProduct1.body.id + '-' + sampleProduct1.body.masterVariant.id);
                assert.isArray(product.variants);
                assert.equal(product.variants.length, sampleProduct1.body.variants.length + 1); // sample product
                // variants + master variants
                product.variants.forEach(function (variant) {
                    assert.isDefined(variant.id);
                    assert.include(variant.id, '-');
                    assert.isDefined(variant.sku);
                });
            });
        });

        it('Test getProduct with product variant id', () => {
            let args = {
                id: '526dc571-104f-40fb-b761-71781a97910b-2',
                __ow_headers: {
                    'accept-language': 'en-US'
                }
            };
            let productId = args.id.substring(0, args.id.lastIndexOf('-'));
            const expectedArgs = [{
                uri: `/${config.CT_PROJECTKEY}/product-projections/526dc571-104f-40fb-b761-71781a97910b?expand=productType`,
                method: 'GET',
                headers: undefined
            }];

            return this.prepareResolve(sampleProduct1, expectedArgs).execute(args).then(result => {
                assert.isDefined(result);
                assert.isDefined(result.response);
                assert.isDefined(result.response.body);
                // check product
                let product = result.response.body;
                assert.isDefined(product.id, 'Property \'id\' is mandatory for product');
                assert.strictEqual(product.id, productId, 'Product identifier does not match');

                // check variant information
                assert.strictEqual(product.masterVariantId, sampleProduct1.body.id + '-' + sampleProduct1.body.masterVariant.id);
                assert.isArray(product.variants);
                assert.equal(product.variants.length, sampleProduct1.body.variants.length + 1); // sample product
                // variants + master variants
                product.variants.forEach(function (variant) {
                    assert.isDefined(variant.id);
                    assert.include(variant.id, '-');
                    assert.isDefined(variant.sku);
                });
            });
        });

        it('Test product not found with backend message', () => {
            let args = {
                id: '526dc571-104f-XXXX-b761-71781a97910b'
            };
            let errorMsg = 'The Resource with ID \'526dc571-104f-XXXX-b761-71781a97910b\' was not found.';
            return this.prepareReject({code: 404, body: {message: errorMsg}}).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                assert.strictEqual(result.response.error.message, 'CommerceTools resource not found');
            });
        });

        it('Test product not found with default message', () => {
            let args = {
                id: '526dc571-104f-XXXX-b761-71781a97910b'
            };
            return this.prepareReject({code: 404}).execute(args).then(result => {
                assert.strictEqual(result.response.error.name, 'CommerceServiceResourceNotFoundError');
                assert.strictEqual(result.response.error.message, 'CommerceTools resource not found');
            });
        });
    });
});