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
const {
    aliasFields, moveFields, addFields, ignoreFields
} = require('../resources/transforms');

const transformsObject = require('../../src/graphql/CIFtoCTTransformer');
const ObjectTranformer = require('../../../commerce-cif-common/src/graphql/ObjectTransformer');
const transformer = new ObjectTranformer(transformsObject);

describe('CIF to CommerceTools Transformer', () => {
    describe('Unit Tests', () => {

        it('aliases all alias fields', () => {
            transformer.transform(aliasFields);

            const searchProducts = aliasFields.searchProducts;
            const results = searchProducts.results.masterData.current;
            assert.equal(searchProducts.__aliasFor, "products");
            assert.equal(results.sku.__aliasFor, "slug");

            const variants = results.variants;
            assert.equal(variants.__aliasFor, "allVariants");
            
            const attributes = variants.attributes;
            assert.equal(attributes.__aliasFor, "attributesRaw");
            assert.equal(attributes.id.__aliasFor, "name");
            assert.equal(attributes.attributeDefinition.name.__aliasFor, "label");
            assert.equal(attributes.attributeDefinition.isVariantAxis.__aliasFor, "attributeConstraint");
        });

        it('moves all fields to the right place', () => {
            transformer.transform(moveFields.actualObject);
            assert.containsAllDeepKeys(moveFields.actualObject, moveFields.expectedObject);
        });

        it('adds all the right fields', () => {
            transformer.transform(addFields.actualObject);
            assert.containsAllDeepKeys(addFields.actualObject, addFields.expectedObject);
        });

        it('ignores all the right fields', () => {
            transformer.transform(ignoreFields);
            
            const searchProducts = ignoreFields.searchProducts;
            assert.doesNotHaveAllKeys(searchProducts, ["facets"]);
            const results = searchProducts.results;
            assert.doesNotHaveAllKeys(results, ["assets", "masterVariantId", "prices", "attributes"]);
            const masterData = results.masterData.current;
            const variants = masterData.variants;
            assert.doesNotHaveAllKeys(variants, ["available", "name", "createdAt", "lastModifiedAt", "description", "categories"]);
            assert.doesNotHaveAllKeys(variants.assets, ["url"]);
            assert.doesNotHaveAllKeys(variants.prices, ["amount", "currency"]);
            assert.doesNotHaveAllKeys(masterData.categories, ["mainParentId", "children", "parents"]);

        });
    });
});