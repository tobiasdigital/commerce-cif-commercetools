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
const sampleProduct1 = require('../resources/sample-product-object-mapper');
const sampleProductSearch = require('../resources/sample-product-search');
const MissingProperty = require('@adobe/commerce-cif-common').MissingPropertyException;
const LanguageParser = require('../../src/common/LanguageParser');
const ProductMapper = require('../../src/products/ProductMapper');

describe('commercetools ProductMapper', () => {

    let simpleConstraints = ['None', 'SameForAll'];

    describe('Unit tests', () => {
        let productData = undefined;
        let args = {
            __ow_headers: {
                'accept-language': 'en-US'
            }
        };
        let languageParser = new LanguageParser(args);
        let productMapper = new ProductMapper(languageParser);

        beforeEach(() => {
            productData = JSON.parse(JSON.stringify(sampleProduct1)); // clone original sample data before each test
        });

        it('maps prices', () => {
            let mappedPrices = productMapper._mapPrices(sampleProduct1.body.masterVariant.prices);
            assert.isDefined(mappedPrices);
            assert.isArray(mappedPrices);
            assert.lengthOf(mappedPrices, sampleProduct1.body.masterVariant.prices.length);

            mappedPrices.forEach(price => {
                assert.hasAnyKeys(price, ['amount', 'currency', 'country']);
                assert.isNumber(price.amount);
            });

            assert.isUndefined(mappedPrices[0].country);
        });

        it('maps assets', () => {
            let mappedAssets = productMapper._mapImages(sampleProduct1.body.masterVariant.images);
            assert.isDefined(mappedAssets);
            assert.isArray(mappedAssets);
            assert.lengthOf(mappedAssets, sampleProduct1.body.masterVariant.images.length);

            mappedAssets.forEach(asset => {
                assert.hasAnyKeys(asset, ['id', 'url']);
            });
        });

        it('maps a product', () => {
            let mappedProduct = productMapper.mapProduct(productData, args);
            assert.strictEqual(mappedProduct.id, productData.body.id);
            assert.strictEqual(mappedProduct.masterVariantId, productData.body.id + '-' + productData.body.masterVariant.id);
            assert.strictEqual(mappedProduct.name, productData.body.name.en);
            assert.strictEqual(mappedProduct.slug, productData.body.slug.en);
            assert.strictEqual(mappedProduct.description, productData.body.description.en);
            assert.strictEqual(mappedProduct.createdAt, productData.body.createdAt);
            assert.strictEqual(mappedProduct.lastModifiedAt, productData.body.lastModifiedAt);
            assert.lengthOf(mappedProduct.variants, productData.body.variants.length + 1);
            assert.lengthOf(mappedProduct.categories, productData.body.categories.length);
        });

        it('throws an exception for an invalid product id', () => {
            delete productData.body.id;
            assert.throws(() => productMapper.mapProduct(productData, args), MissingProperty);
        });

        it('throws an exception for an invalid product master variant', () => {
            delete productData.body.masterVariant;
            assert.throws(() => productMapper.mapProduct(productData, args), MissingProperty);
        });

        it('throws an exception for an invalid product master variant id', () => {
            delete productData.body.masterVariant.id;
            assert.throws(() => productMapper.mapProduct(productData, args), MissingProperty);
        });

        it('maps a product variant', () => {
            let mappedProduct = productMapper.mapProduct(productData, args);
            let mappedVariant = mappedProduct.variants.filter(variant => variant.id == mappedProduct.masterVariantId)[0];

            assert.strictEqual(mappedVariant.id, productData.body.id + '-' + productData.body.masterVariant.id);
            assert.strictEqual(mappedVariant.sku, productData.body.masterVariant.sku);
            assert.strictEqual(mappedVariant.name, (mappedProduct.name || ""));
            assert.strictEqual(mappedVariant.description, (productData.body.masterVariant.description || {}).en);
            assert.lengthOf(mappedVariant.prices, productData.body.masterVariant.prices.length);
            assert.lengthOf(mappedVariant.assets, productData.body.masterVariant.images.length);

            // The test product has one 'SameForAll' attribute
            assert.lengthOf(mappedProduct.attributes, 1);
            assert.strictEqual(mappedProduct.attributes[0].id, 'designer');
            assert.strictEqual(mappedProduct.attributes[0].value, 'Patagonia');

            // The master variant has one less attribute (that is, the 'SameForAll' attribute) compared to CT
            assert.lengthOf(mappedVariant.attributes, productData.body.masterVariant.attributes.length - 1);
            // Test a localized attribute
            assert.strictEqual(mappedVariant.attributes.find(a => a.id == 'color').value, 'green');
            // Test a non-localized attribute
            assert.strictEqual(mappedVariant.attributes.find(a => a.id == 'testNumber').value, 42);
            
            let length = productData.body.productType.obj.attributes.filter(attr => !simpleConstraints.includes(attr.attributeConstraint)).length;
            assert.lengthOf(mappedVariant.attributes.filter(attr => attr.isVariantAxis), length);
        });

        it('maps product variant attributes', () => {
            let mappedProduct = productMapper.mapProduct(productData, args);
            mappedProduct.variants.forEach(variant => {
                variant.attributes.forEach(attr => {
                    assert.hasAnyKeys(attr, ['id', 'value', 'name']);
                    if (attr.id === 'color' || attr.id === 'size') {
                        assert.isTrue(attr.isVariantAxis);
                    } else {
                        assert.isTrue(attr.isVariantAxis === undefined || attr.isVariantAxis === false);
                    }
                });
            })
        });

        it('only maps common attributes to the base product', () => {
            let pagedResponse = productMapper.mapPagedProductResponse(sampleProductSearch, args);
            let mappedProduct = pagedResponse.results[0];
            // The sample search result product does not contain any 'SameForAll' attribute
            assert.isUndefined(mappedProduct.attributes);
        });

        it('maps a product search with query facets', () => {
            let mappedProduct = productMapper.mapPagedProductResponse(sampleProductSearch, args);
            let sampleFacets = sampleProductSearch.body.facets;
            assert.isDefined(mappedProduct);
            assert.isDefined(mappedProduct.facets);
            assert.isDefined(mappedProduct.facets.length);
            mappedProduct.facets.forEach((facet) => {
                assert.isDefined(facet.name);
                let sampleFacet = sampleFacets[facet.id];
                assert.isDefined(sampleFacet.type);
                if (sampleFacet.type === 'range') {
                    assert.strictEqual(facet.missed, sampleFacet.missing);
                    facet.values.forEach((facetValue, idx) => {
                        let range = sampleFacet.ranges[idx];
                        assert.strictEqual(facetValue.value, `${range.from}-${range.to}`);
                        assert.strictEqual(facetValue.occurrences, range.productCount);
                        assert.isUndefined(facetValue.selected);
                    });
                } else {
                    assert.strictEqual(facet.missed, sampleFacet.missing);
                    facet.values.forEach((facetValue, idx) => {
                        let term = sampleFacet.terms[idx];
                        assert.strictEqual(facetValue.value, term.term);
                        assert.strictEqual(facetValue.occurrences, term.productCount);
                        assert.isUndefined(facetValue.selected);
                    });
                }
            });
        });

        it('maps a product search with query and selected facets', () => {
            let selectedFacets = {
                selectedFacets: 'variants.attributes.color.en:purple|variants.prices.value.centAmount:range (5000 to 15000)'
            };
            let mappedProduct = productMapper.mapPagedProductResponse(sampleProductSearch, Object.assign({}, selectedFacets, args));
            let sampleFacets = sampleProductSearch.body.facets;
            assert.isDefined(mappedProduct);
            assert.isDefined(mappedProduct.facets);
            assert.isDefined(mappedProduct.facets.length);
            mappedProduct.facets.forEach((facet) => {
                let sampleFacet = sampleFacets[facet.id];
                if (sampleFacet.type === 'range') {
                    facet.values.forEach((facetValue) => {
                        if (facetValue.value === '5000-15000') {
                            assert.isDefined(facetValue.selected);
                            assert.strictEqual(facetValue.selected, true);
                        }
                    });
                } else {
                    facet.values.forEach((facetValue) => {
                        if (facetValue === 'purple') {
                            assert.isDefined(facetValue.selected);
                            assert.strictEqual(facetValue.selected, true);
                        }
                    });
                }
            });
        });

        it('maps a product search facets based on attributes', () => {
            let mappedFacets = productMapper.getProductFacets(sampleProductSearch, args);
            let sampleAttributes = sampleProductSearch.body.results[0].productType.obj.attributes;
            assert.isDefined(mappedFacets);
            assert.strictEqual(mappedFacets.length, 7);
            assert.strictEqual(sampleAttributes.length, 7);
            sampleAttributes.forEach(sampleFacet => {
                mappedFacets.forEach(mappedFacet => {
                    if (`variants.attributes.${sampleFacet.name}.en` === mappedFacet.name) {
                        assert.strictEqual(mappedFacet.label, sampleFacet.label.en);
                        return;
                    }
                });
            });
        });

    });
});
