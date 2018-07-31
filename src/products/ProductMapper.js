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

const Product = require('@adobe/commerce-cif-model').Product;
const Price = require('@adobe/commerce-cif-model').Price;
const Asset = require('@adobe/commerce-cif-model').Asset;
const Attribute = require('@adobe/commerce-cif-model').Attribute;
const ProductVariant = require('@adobe/commerce-cif-model').ProductVariant;
const Category = require('@adobe/commerce-cif-model').Category;
const PagedResponse = require('@adobe/commerce-cif-model').PagedResponse;
const Facet = require('@adobe/commerce-cif-model').Facet;
const FacetValue = require('@adobe/commerce-cif-model').FacetValue;
const MissingPropertyException = require('@adobe/commerce-cif-common/exception').MissingPropertyException;

/**
 * Utility class to map commercetools objects to CCIF objects. Private marked methods should not be used outside
 * of this class.
 */
class ProductMapper {

    /**
     * Constructor.
     * 
     * @param {LanguageParser} languageParser LanguageParser reference
     */
    constructor(languageParser) {
        this.languageParser = languageParser;
    }

    /**
     * Maps a commercetools products search to a PagedResponse
     *
     * @param ctResult              JSON object returned by the commercetools product search.
     * @returns {PagedResponse}     A paged response with products.
     */
    mapPagedProductResponse(result, args) {
        let pr = new PagedResponse();
        pr.offset = result.body.offset || 0;
        pr.count = result.body.count;
        pr.total = result.body.total;
        pr.results = this.mapProducts(result.body.results, args);
        if (result.body.facets) {
            pr.facets = this._mapFacets(result.body.facets, args);
        }
        return pr;
    }

    /**
     * Maps an array of commercetools products to an array of CCIF products
     *
     * @param ctProducts            JSON array of commercetools products.
     * @returns {Product}           An array of CCIF products.
     */
    mapProducts(ctProducts) {
        return ctProducts.map(ctProduct => this._mapProduct(ctProduct));
    }

    /**
     * Maps a single commercetools product to a CCIF product.
     *
     * @param response              JSON response with commercetools product, containing the body enclosing property.
     * @param args                  OpenWhisk action arguments
     * @returns {Product}           A CCIF product.
     */
    mapProduct(response) {
        return this._mapProduct(response.body);
    }

    /**
     * Reused from mapProduct and mapProducts.
     *
     * @private
     */
    _mapProduct(ctProduct) {
        if (ctProduct.id === undefined) {
            throw new MissingPropertyException('id missing for commercetools product');
        }
        if (ctProduct.masterVariant === undefined || ctProduct.masterVariant.id === undefined) {
            throw new MissingPropertyException('master variant missing for commercetools product');
        }

        let masterVariantId = ctProduct.id + '-' + ctProduct.masterVariant.id;
        let name = this.languageParser.pickLanguage(ctProduct.name) || "";
        let p = new Product(ctProduct.id, masterVariantId, name, [], this._mapProductVariants(ctProduct));
        if (ctProduct.description) {
            p.description = this.languageParser.pickLanguage(ctProduct.description);
        }
        p.createdAt = ctProduct.createdAt;
        p.lastModifiedAt = ctProduct.lastModifiedAt;
        p.categories = this._mapProductCategories(ctProduct.categories);
        return p;
    }

    /**
     * Maps a CommerceTools cart line item to a CCIF product variant
     *
     * @param ctLineItem            A CommerceTools cart line item.
     * @returns {ProductVariant}    A CCIF product variant.
     */

    mapProductVariant(ctLineItem) {
        let attributesTypes = [];
        if (ctLineItem.productType.obj) {
            attributesTypes = this._extractAttributesTypes(ctLineItem);
        }

        // TODO: Get actual value from backend
        let available = true;
        let name = this.languageParser.pickLanguage(ctLineItem.name) || "";
        let prices = this._mapPrices(ctLineItem.variant.prices);

        let v = new ProductVariant(available, ctLineItem.productId + '-' + ctLineItem.variant.id, name, prices, ctLineItem.variant.sku);

        v.assets = this._mapImages(ctLineItem.variant.images);
        v.attributes = this._mapAttributes(attributesTypes, ctLineItem.variant.attributes);
        return v;
    }

    /**
     * Determines CommmerceTools list of facets based on product type attributes. Used to auto-discover the product type facets.
     *
     * @param results
     * @return {Array}
     */
    getProductFacets(result) {
        let facets = [];
        if (result && result.body.count > 0) {
            result.body.results[0].productType.obj.attributes.forEach(attribute => {
                if (attribute.isSearchable === true) {
                    let facet = new Facet();
                    facet.id = `variants.attributes.${attribute.name}.en`;
                    facet.name = this.languageParser.pickLanguage(attribute.label) || facet.id;
                    facets.push(facet);
                }
            });
        }

        facets.push(this._initProductFacet('categories.id', 'Category'));
        facets.push(this._initProductFacet('variants.prices.value.centAmount', 'Price'));

        return facets;
    }

    /**
     * @private
     */
    _mapProductVariants(ctProduct) {
        let attributesTypes = [];
        if (ctProduct.productType.obj) {
            attributesTypes = this._extractAttributesTypes(ctProduct);
        }

        let variants = [];
        // make sure the default variant is included in the variants;
        variants.push(this._mapProductVariant(ctProduct, ctProduct.masterVariant, attributesTypes));
        return variants.concat(ctProduct.variants.map(variant => {
            return this._mapProductVariant(ctProduct, variant, attributesTypes);
        }));
    }

    /**
     * @private
     */
    _mapProductVariant(ctProduct, variant, attributesTypes) {
        // TODO: Get actual value from backend
        let available = true;
        let name = this.languageParser.pickLanguage(variant.name) || this.languageParser.pickLanguage(ctProduct.name) || "";
        let prices = this._mapPrices(variant.prices);

        let v = new ProductVariant(available, ctProduct.id + '-' + variant.id, name, prices, variant.sku);

        if (variant.description) {
            v.description = this.languageParser.pickLanguage(variant.description);
        }

        v.assets = this._mapImages(variant.images);
        v.attributes = this._mapAttributes(attributesTypes, variant.attributes);
        return v;
    }

    /**
     * @private
     */
    _mapProductCategories(categories) {
        if (categories) {
            return categories.map(category => {
                return new Category(category.id);
            });
        }
    }

    /**
     * @private
     */
    _isVariantAttributeConstraint(attributeConstraint) {
        return attributeConstraint === 'Unique' || attributeConstraint === 'CombinationUnique';
    }

    /**
     * @private
     */
    _extractAttributesTypes(container) {
        return container.productType.obj.attributes
            .map(attribute => {
                return {
                    id: attribute.name,
                    name: this.languageParser.pickLanguage(attribute.label),
                    variantAttribute: this._isVariantAttributeConstraint(attribute.attributeConstraint)
                }
            });
    }

    /**
     * @private
     */
    _mapPrices(prices) {
        if (prices) {
            return prices.map(price => {
                let p = new Price(price.value.centAmount, price.value.currencyCode);
                p.country = price.country;
                return p;
            });
        }
    }

    /**
     * @private
     */
    _mapImages(images) {
        if (images) {
            return images.map(image => {
                let assets = new Asset();
                if (image.id) {
                    assets.id = image.id;
                } else {
                    assets.id = image.url.substring(image.url.lastIndexOf('/') + 1);
                }
                assets.url = image.url;
                return assets;
            });
        }
    }

    /**
     * @private
     */
    _mapAttributes(attributesTypes, attributes) {
        if (attributesTypes && attributes) {
            return attributes.map(attribute => {
                let types = attributesTypes.filter(attributeType => attributeType.id == attribute.name);
                if (types.length) {
                    let attr = new Attribute(types[0].id, types[0].name, this.languageParser.pickLanguage(attribute.value));
                    attr.variantAttribute = types[0].variantAttribute;
                    return attr;
                } else {
                    return new Attribute(attribute.name, null, this.languageParser.pickLanguage(attribute.value));
                }
            });
        }
    }

    /**
     * @private
     */
    _mapFacets(ctFacets, args) {
        if (!ctFacets) {
            return;
        }
        let cifFacet;
        let ctFacetNames = Object.keys(ctFacets);
        return ctFacetNames.map(facetName => {
            cifFacet = new Facet();
            cifFacet.id = facetName;
            cifFacet.name = this.languageParser.pickLanguage(ctFacets[facetName].label) || facetName;
            cifFacet.missed = ctFacets[facetName].missing;
            if (ctFacets[facetName].type === 'range') {
                cifFacet.type = ctFacets[facetName].type;
                cifFacet.values = ctFacets[facetName].ranges.map(range => {
                    let facetValue = `${range.from}-${range.to}`;
                    return this._getCifFacetValue(`${facetName}.${facetValue}`, facetValue, cifFacet.id, range.productCount, args);
                });
            } else {
                cifFacet.type = ctFacets[facetName].dataType;
                cifFacet.values = ctFacets[facetName].terms.map(ctTerm => {
                    return this._getCifFacetValue(`${facetName}.${ctTerm.term}`, ctTerm.term, cifFacet.id, ctTerm.productCount, args);
                });
            }
            return cifFacet;
        });
    }

    /**
     *
     * @private
     */
    _getCifFacetValue(valueId, facetValue, facetName, count, args) {
        let cifFacetValue = new FacetValue();
        cifFacetValue.value = facetValue;
        cifFacetValue.id = valueId;
        cifFacetValue.occurrences = count;
        if (args) {
            let selectedFacets = args.selectedFacets ? args.selectedFacets.split('|') : [];
            selectedFacets.forEach(facet => {
                if (facet.substring(0, facet.indexOf(':')) === facetName) {
                    if (this._getSelectedFacetValue(facet).includes(cifFacetValue.value)) {
                        cifFacetValue.selected = true;
                    }
                }
            });
        }
        return cifFacetValue;
    }

    /**
     *
     * @private
     */
    _initProductFacet(name, label) {
        let facet = new Facet();
        facet.id = name;
        facet.name = this.languageParser.pickLanguage(label) || facet.id;
        return facet;
    }

    /**
     * Example of selected facet values:
     *  - variants.prices.value.centAmount:range (5000 to 15000)
     *  - variants.attributes.color.en: "purple","red"
     *
     * @param selectedFacet
     * @return {Array} of values for the facets
     * @private
     */
    _getSelectedFacetValue(selectedFacet) {
        //removes any space and splits the facets values
        let facetValues = selectedFacet.replace(/\s/g, '').substring(selectedFacet.indexOf(':') + 1).split(',');
        if (selectedFacet.includes(':range')) {
            return facetValues.map(facetValue => {
                //transform  facet range values 'range (5000 to 15000)' to '5000-15000'
                return  facetValue.replace(/range\(([\d]+)to([\d]+)\)/g, '$1-$2');
            });
        } else {
            return facetValues.map(facetValue => {
                return facetValue.replace(/"/g, '');
            });
        }

    }
}

module.exports = ProductMapper;
