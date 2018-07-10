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
     * Maps a commercetools products search to a PagedResponse
     *
     * @param ctResult              JSON object returned by the commercetools product search.
     * @returns {PagedResponse}     A paged response with products.
     */
    static mapPagedProductResponse(result, args) {
        let pr = new PagedResponse();
        pr.offset = result.body.offset;
        pr.count = result.body.count;
        pr.total = result.body.total;
        pr.results = ProductMapper.mapProducts(result.body.results);
        if (result.body.facets) {
            pr.facets = ProductMapper._mapFacets(result.body.facets, args);
        }
        return pr;
    }

    /**
     * Maps an array of commercetools products to an array of CCIF products
     *
     * @param ctProducts            JSON array of commercetools products.
     * @returns {Product}           An array of CCIF products.
     */
    static mapProducts(ctProducts) {
        return ctProducts.map(ctProduct => ProductMapper._mapProduct(ctProduct));
    }

    /**
     * Maps a single commercetools product to a CCIF product.
     *
     * @param response              JSON response with commercetools product, containing the body enclosing property.
     * @returns {Product}           A CCIF product.
     */
    static mapProduct(response) {
        return ProductMapper._mapProduct(response.body);
    }

    /**
     * Reused from mapProduct and mapProducts.
     *
     * @private
     */
    static _mapProduct(ctProduct) {
        if (ctProduct.id === undefined) {
            throw new MissingPropertyException('id missing for commercetools product');
        }
        if (ctProduct.masterVariant === undefined || ctProduct.masterVariant.id === undefined) {
            throw new MissingPropertyException('master variant missing for commercetools product');
        }

        let masterVariantId = ctProduct.id + '-' + ctProduct.masterVariant.id;
        let p = new Product(ctProduct.id, masterVariantId, ProductMapper._mapProductVariants(ctProduct));
        p.name = ctProduct.name;
        p.description = ctProduct.description;
        p.createdDate = ctProduct.createdAt;
        p.lastModifiedDate = ctProduct.lastModifiedAt;
        p.categories = ProductMapper._mapProductCategories(ctProduct.categories);
        return p;
    }

    /**
     * Maps a CommerceTools cart line item to a CCIF product variant
     *
     * @param ctLineItem            A CommerceTools cart line item.
     * @returns {ProductVariant}    A CCIF product variant.
     */

    static mapProductVariant(ctLineItem) {
        let attributesTypes = [];
        if (ctLineItem.productType.obj) {
            attributesTypes = ProductMapper._extractAttributesTypes(ctLineItem);
        }

        let v = new ProductVariant(ctLineItem.productId + '-' + ctLineItem.variant.id);
        v.name = ctLineItem.name;
        v.sku = ctLineItem.variant.sku;
        v.prices = ProductMapper._mapPrices(ctLineItem.variant.prices);
        v.assets = ProductMapper._mapImages(ctLineItem.variant.images);
        v.attributes = ProductMapper._mapAttributes(attributesTypes, ctLineItem.variant.attributes);
        return v;
    }

    /**
     * Determines CommmerceTools list of facets based on product type attributes. Used to auto-discover the product type facets.
     *
     * @param results
     * @return {Array}
     */
    static getProductFacets(result) {
        let facets = [];
        if (result && result.body.count > 0) {
            result.body.results[0].productType.obj.attributes.forEach(attribute => {
                if (attribute.isSearchable === true) {
                    let facet = new Facet();
                    facet.name = `variants.attributes.${attribute.name}.en`;
                    facet.label = attribute.label;
                    facets.push(facet);
                }
            });
        }

        facets.push(ProductMapper._initProductFacet('categories.id', 'Category'));
        facets.push(ProductMapper._initProductFacet('variants.prices.value.centAmount', 'Price'));

        return facets;
    }

    /**
     * @private
     */
    static _mapProductVariants(ctProduct) {
        let attributesTypes = [];
        if (ctProduct.productType.obj) {
            attributesTypes = ProductMapper._extractAttributesTypes(ctProduct);
        }

        let variants = [];
        // make sure the default variant is included in the variants;
        variants.push(ProductMapper._mapProductVariant(ctProduct, ctProduct.masterVariant, attributesTypes));
        return variants.concat(ctProduct.variants.map(variant => {
            return ProductMapper._mapProductVariant(ctProduct, variant, attributesTypes);
        }));
    }

    /**
     * @private
     */
    static _mapProductVariant(ctProduct, variant, attributesTypes) {
        let v = new ProductVariant(ctProduct.id + '-' + variant.id);
        v.name = variant.name;
        v.description = variant.description;
        v.sku = variant.sku;
        v.prices = ProductMapper._mapPrices(variant.prices);
        v.assets = ProductMapper._mapImages(variant.images);
        v.attributes = ProductMapper._mapAttributes(attributesTypes, variant.attributes);
        return v;
    }

    /**
     * @private
     */
    static _mapProductCategories(categories) {
        if (categories) {
            return categories.map(category => {
                return new Category(category.id);
            });
        }
    }

    /**
     * @private
     */
    static _isVariantAttributeConstraint(attributeConstraint) {
        return attributeConstraint === 'Unique' || attributeConstraint === 'CombinationUnique';
    }

    /**
     * @private
     */
    static _extractAttributesTypes(container) {
        return container.productType.obj.attributes
            .map(attribute => {
                return {
                    id: attribute.name,
                    name: attribute.label,
                    variantAttribute: ProductMapper._isVariantAttributeConstraint(attribute.attributeConstraint)
                }
            });
    }

    /**
     * @private
     */
    static _mapPrices(prices) {
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
    static _mapImages(images) {
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
    static _mapAttributes(attributesTypes, attributes) {
        if (attributesTypes && attributes) {
            return attributes.map(attribute => {
                let types = attributesTypes.filter(attributeType => attributeType.id == attribute.name);
                if (types.length) {
                    let attr = new Attribute(types[0].id, types[0].name, attribute.value);
                    attr.variantAttribute = types[0].variantAttribute;
                    return attr;
                } else {
                    return new Attribute(attribute.name, null, attribute.value);
                }
            });
        }
    }

    /**
     * @private
     */
    static _mapFacets(ctFacets, args) {
        if (ctFacets) {
            let cifFacet;
            let ctFacetNames = Object.keys(ctFacets);
            return ctFacetNames.map(facetName => {
                cifFacet = new Facet();
                cifFacet.name = facetName;
                cifFacet.missed = ctFacets[facetName].missing;
                if (ctFacets[facetName].type === 'range') {
                    cifFacet.type = ctFacets[facetName].type;
                    cifFacet.facetValues = ctFacets[facetName].ranges.map(range => {
                        let facetValue = `${range.from}-${range.to}`;
                        return ProductMapper._getCifFacetValue(`${facetName}.${facetValue}`, facetValue, cifFacet.name, range.productCount, args);
                    });
                } else {
                    cifFacet.type = ctFacets[facetName].dataType;
                    cifFacet.facetValues = ctFacets[facetName].terms.map(ctTerm => {
                        return ProductMapper._getCifFacetValue(`${facetName}.${ctTerm.term}`, ctTerm.term, cifFacet.name, ctTerm.productCount, args);
                    });
                }
                return cifFacet;
            });

        }
    }

    /**
     *
     * @private
     */
    static _getCifFacetValue(valueId, facetValue, facetName, count, args) {
        let cifFacetValue = new FacetValue();
        cifFacetValue.value = facetValue;
        cifFacetValue.id = valueId;
        cifFacetValue.occurrences = count;
        if (args) {
            let selectedFacets = args.selectedFacets ? args.selectedFacets.split('|') : [];
            selectedFacets.forEach(facet => {
                if (facet.substring(0, facet.indexOf(':')) === facetName) {
                    if (ProductMapper._getSelectedFacetValue(facet).includes(cifFacetValue.value)) {
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
    static _initProductFacet(name, label) {
        let facet = new Facet();
        facet.name = name;
        facet.label = {};
        facet.label.en = label;
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
    static _getSelectedFacetValue(selectedFacet) {
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
