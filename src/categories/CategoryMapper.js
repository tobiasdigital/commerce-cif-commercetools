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

const Category = require('@adobe/commerce-cif-model').Category;
const PagedResponse = require('@adobe/commerce-cif-model').PagedResponse;

/**
 * Utility class to map commercetools categories to CCIF categories.
 * Methods marked private should not be used outside of this class.
 */
class CategoryMapper {

    /**
     * Constructor.
     * 
     * @param {LanguageParser} languageParser LanguageParser reference
     */
    constructor(languageParser) {
        this.languageParser = languageParser;
    }

    /**
     * Maps a commercetools categories response to a PagedResponse.
     * If the type parameter is 'flat', the count property of the paged response is equal to the size of the results array.
     * If the type parameter is 'tree', the count property of the paged response is equal to the total number of
     * categories of the results array recursively including all sub-categories defined in all categories.
     *
     * @param ctResult              JSON object returned by the commercetools categories search.
     * @param type                  The type of the returned category structure, valid values are 'flat' (default) or 'tree'.
     * @param depth                 If type equals 'tree', the depth defins the maximum depth of the returned category tree(s).
     * @returns {PagedResponse}     A paged response with products.
     */
    mapPagedCategoryResponse(ctResult, args, type = 'flat', depth) {
        // if depth is defined, exclude "too deep" categories from the commerce tools results
        if (depth >= 0 && ctResult.body.results) {
            ctResult.body.results = ctResult.body.results.filter(cat => !cat.ancestors || cat.ancestors.length <= depth);
        }

        let results = (type === 'tree') ? this._mapCategoriesTree(ctResult) : this._mapCategories(ctResult);

        let pr = new PagedResponse.Builder()
            .withOffset(ctResult.body.offset)
            .withCount(ctResult.body.count)
            .withTotal(ctResult.body.total)
            .withResults(results)
            .build();
        pr.offset = ctResult.body.offset || 0;
        pr.count = ctResult.body.results ? ctResult.body.results.length : 1;
        pr.total = ctResult.body.total || 1;

        return pr;
    }
    
    /**
     * Maps a commercetools category response to a CCIF category.
     * 
     * @param ctResult              JSON object returned by the commercetools categories by id search.
     * @param args                  OpenWhisk action arguments
     * @returns {Category}          A CCIF category.
     */
    mapCategory(ctResult) {
        return this._mapCategory(ctResult.body);
    }

    /**
     * Maps an array of commercetools categories to a tree of CCIF categories.
     * The result can contain multiple disjoint trees if the product catalog has multiple root categories or with paginated results.
     *
     * @private
     * @param ctResult              JSON object returned by the commercetools categories search.
     * @returns {Category[]}        An array of CCIF categories.
     */
    _mapCategoriesTree(ctResult) {
        let categories = this._mapCategories(ctResult);
        
        let categoryMap = new Map();
        categories.forEach(cat => categoryMap.set(cat.id, cat));
        
        // when paging is enabled, orphans are categories for which the parent is missing
        // because it's not included in that paged response
        let orphans = [];
        
        for (let cat of categoryMap.values()) {
            if (cat.parents) {
                // in CommerceTools, a category only has one parent
                let parentId = cat.parents[0].id;
                if (categoryMap.has(parentId)) {
                    let parent = categoryMap.get(parentId);
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(cat);
                } else {
                    orphans.push(cat);
                }
            }
        }
        
        return categories.filter(cat => !cat.parents).concat(orphans);
    }
    
    /**
     * Maps an array of commercetools categories to an array of CCIF categories
     *
     * @private
     * @param ctResult              JSON object returned by the commercetools categories search.
     * @returns {Category[]}        An array of CCIF categories.
     */
    _mapCategories(ctResult) {
        if (ctResult.body.results) {
            return ctResult.body.results.map(category => {
                return this._mapCategory(category);
            });
        } else if (ctResult.body.id) {
            return [this._mapCategory(ctResult.body)];
        }
    }

    /**
     * Maps a commercetools category to a CCIF category
     *
     * @private
     * @param ctCategory     Category as returned by CommerceTools
     * @returns {Category}   A CCIF category
     */
    _mapCategory(ctCategory) {
        let category = new Category.Builder()
            .withId(ctCategory.id)
            .build();
        
        category.name = this.languageParser.pickLanguage(ctCategory.name);
        category.description = this.languageParser.pickLanguage(ctCategory.description);
        category.slug = this.languageParser.pickLanguage(ctCategory.slug);
        
        if (ctCategory.parent) {
            let parentCategory = new Category.Builder()
                .withId(ctCategory.parent.id)
                .build();
            category.parents = [parentCategory];
        }

        category.createdAt = ctCategory.createdAt;
        category.lastModifiedAt = ctCategory.lastModifiedAt;
        
        return category;
    }
}

module.exports = CategoryMapper;