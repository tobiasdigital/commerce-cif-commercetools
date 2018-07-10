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
const utils = require('../lib/utils');

describe('commercetools ProductMapper', () => {

    let action = utils.getPathForAction(__dirname, 'ProductMapper');
    let productMapper = require(action);
    let simpleConstraints = ['None', 'SameForAll'];

    describe('Unit tests', () => {
        let productData = undefined;

        beforeEach(() => {
            productData = JSON.parse(JSON.stringify(sampleProduct1)); // clone original sample data before each test
        });

        it('prices', () => {
            let mappedPrices = productMapper._mapPrices(sampleProduct1.body.masterVariant.prices);
            assert.isDefined(mappedPrices);
            assert.isArray(mappedPrices);
            assert.lengthOf(mappedPrices, sampleProduct1.body.masterVariant.prices.length);

            mappedPrices.forEach(price => {
                assert.hasAnyKeys(price, ['centAmount', 'currency', 'country']);
                assert.isNumber(price.centAmount);
            });

            assert.isUndefined(mappedPrices[0].country);
        });

        it('assets', () => {
            let mappedAssets = productMapper._mapImages(sampleProduct1.body.masterVariant.images);
            assert.isDefined(mappedAssets);
            assert.isArray(mappedAssets);
            assert.lengthOf(mappedAssets, sampleProduct1.body.masterVariant.images.length);

            mappedAssets.forEach(asset => {
                assert.hasAnyKeys(asset, ['id', 'url']);
            });
        });

        it('product', () => {
            let mappedProduct = productMapper.mapProduct(productData);
            assert.strictEqual(mappedProduct.id, productData.body.id);
            assert.strictEqual(mappedProduct.masterVariantId, productData.body.id + '-' + productData.body.masterVariant.id);
            assert.strictEqual(mappedProduct.name, productData.body.name);
            assert.strictEqual(mappedProduct.description, productData.body.description);
            assert.strictEqual(mappedProduct.createdDate, productData.body.createdAt);
            assert.strictEqual(mappedProduct.lastModifiedDate, productData.body.lastModifiedAt);
            assert.lengthOf(mappedProduct.variants, productData.body.variants.length + 1);
            assert.lengthOf(mappedProduct.categories, productData.body.categories.length);
        });

        it('invalid product id', () => {
            delete productData.body.id;
            assert.throws(() => productMapper.mapProduct(productData), MissingProperty);
        });

        it('invalid product master variant', () => {
            delete productData.body.masterVariant;
            assert.throws(() => productMapper.mapProduct(productData), MissingProperty);
        });

        it('invalid product master variant', () => {
            delete productData.body.masterVariant.id;
            assert.throws(() => productMapper.mapProduct(productData), MissingProperty);
        });


        it('product variant', () => {
            let mappedProduct = productMapper.mapProduct(productData);
            let mappedVariant = mappedProduct.variants.filter(variant => variant.id == mappedProduct.masterVariantId)[0];

            assert.strictEqual(mappedVariant.id, productData.body.id + '-' + productData.body.masterVariant.id);
            assert.strictEqual(mappedVariant.sku, productData.body.masterVariant.sku);
            assert.strictEqual(mappedVariant.name, productData.body.masterVariant.name);
            assert.strictEqual(mappedVariant.description, productData.body.masterVariant.description);
            assert.lengthOf(mappedVariant.prices, productData.body.masterVariant.prices.length);

            assert.lengthOf(mappedVariant.assets, productData.body.masterVariant.images.length);   
            assert.lengthOf(mappedVariant.attributes, productData.body.masterVariant.attributes.length);
            
            let length = productData.body.productType.obj.attributes.filter(attr => !simpleConstraints.includes(attr.attributeConstraint)).length;
            assert.lengthOf(mappedVariant.attributes.filter(attr => attr.variantAttribute), length);
        });

        it('product variant attributes', () => {
            let mappedProduct = productMapper.mapProduct(productData);
            mappedProduct.variants.forEach(variant => {
                variant.attributes.forEach(attr => {
                    assert.hasAnyKeys(attr, ['id', 'value', 'name']);
                    if (attr.id === 'color' || attr.id === 'size') {
                        assert.isTrue(attr.variantAttribute);
                    } else {
                        assert.isTrue(attr.variantAttribute === undefined || attr.variantAttribute === false);
                    }
                });
            })
        });

        it('product search with query facets', () => {
            let mappedProduct = productMapper.mapPagedProductResponse(sampleProductSearch);
            let sampleFacets = sampleProductSearch.body.facets;
            assert.isDefined(mappedProduct);
            assert.isDefined(mappedProduct.facets);
            assert.isDefined(mappedProduct.facets.length);
            mappedProduct.facets.forEach((facet) => {
                assert.isDefined(facet.name);
                let sampleFacet = sampleFacets[facet.name];
                assert.isDefined(sampleFacet.type);
                if (sampleFacet.type === 'range') {
                    assert.strictEqual(facet.missed, sampleFacet.missing);
                    facet.facetValues.forEach((facetValue, idx) => {
                        let range = sampleFacet.ranges[idx];
                        assert.strictEqual(facetValue.value, `${range.from}-${range.to}`);
                        assert.strictEqual(facetValue.occurrences, range.productCount);
                        assert.isUndefined(facetValue.selected);
                    });
                } else {
                    assert.strictEqual(facet.missed, sampleFacet.missing);
                    facet.facetValues.forEach((facetValue, idx) => {
                        let term = sampleFacet.terms[idx];
                        assert.strictEqual(facetValue.value, term.term);
                        assert.strictEqual(facetValue.occurrences, term.productCount);
                        assert.isUndefined(facetValue.selected);
                    });
                }
            });
        });

        it('product search with query and selected facets', () => {
            let selectedFacets = {
                'selectedFacets': 'variants.attributes.color.en:purple|variants.prices.value.centAmount:range (5000 to 15000)'
            };
            let mappedProduct = productMapper.mapPagedProductResponse(sampleProductSearch, selectedFacets);
            let sampleFacets = sampleProductSearch.body.facets;
            assert.isDefined(mappedProduct);
            assert.isDefined(mappedProduct.facets);
            assert.isDefined(mappedProduct.facets.length);
            mappedProduct.facets.forEach((facet) => {
                let sampleFacet = sampleFacets[facet.name];
                if (sampleFacet.type === 'range') {
                    facet.facetValues.forEach((facetValue) => {
                        if (facetValue.value === '5000-15000') {
                            assert.isDefined(facetValue.selected);
                            assert.strictEqual(facetValue.selected, true);
                        }
                    });
                } else {
                    facet.facetValues.forEach((facetValue) => {
                        if (facetValue === 'purple') {
                            assert.isDefined(facetValue.selected);
                            assert.strictEqual(facetValue.selected, true);
                        }
                    });
                }
            });
        });

        it('product search facets based on attributes', () => {
            let mappedFacets = productMapper.getProductFacets(sampleProductSearch);
            let sampleAttributes = sampleProductSearch.body.results[0].productType.obj.attributes;
            assert.isDefined(mappedFacets);
            assert.strictEqual(mappedFacets.length, 7);
            assert.strictEqual(sampleAttributes.length, 7);
            sampleAttributes.forEach(sampleFacet => {
                mappedFacets.forEach(mappedFacet => {
                    if (`variants.attributes.${sampleFacet.name}.en` === mappedFacet.name) {
                        assert.strictEqual(sampleFacet.label.en, mappedFacet.label.en);
                        return;
                    }
                });
            });
        });

    });
});
