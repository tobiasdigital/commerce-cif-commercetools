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

const PagedResponse = (originalObject, dataObject, field) => {
    let req = originalObject[field];
    let data = dataObject[field];
    let result = {};
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        if (field === "results") {
            result[key] = arrayMapper(req[key], data[key], Product);
        } else if (field === "facets") {
            result[key] = [];
        } else {
            if (!field.startsWith("__")) {
                result[key] = data[key] || data[key] === 0 ? data[key] : null;
            }
        }
    });
    return result;
}

const arrayMapper = (req, data, type) => {
    if (data && data.length > 0) {
        return data.map(d => {
            return type(req, d);
        });
    } else {
        return [];
    }
}

const Price = (req, data) => {
    let result = {}
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        switch (field) {
            case "amount":
                result[key] = data.value ? data.value.centAmount : null;
                break;
            case "currency":
                result[key] = data.value ? data.value.currencyCode : null;
                break;
            default:
                if (!field.startsWith("__")) {
                    result[key] = data[key] || data[key] === 0 ? data[key] : null;
                }
                break;
        }
    });
    return result;
}

const Asset = (req, data) => {
    let result = {};
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        if (field === "url") {
            result[key] = data.sources ? data.sources.uri : null;
        } else {
            if (!field.startsWith("__")) {
                result[key] = data[key] || data[field] || null; //data[field] for id of prices
            }
        }
    });
    return result;
}

const Attribute = (req, data) => {
    let data2 = data.attributeDefinition || {};
    let result = {};
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        if (field === "isVariantAxis") {
            result[key] = data2[key] === "CombinationUnique" || data.attributeConstraint === "Unique";
        } else if (field === "name") {
            result[key] = data2[key];
        } else {
            if (!field.startsWith("__")) {
                result[key] = data[key] || null;
            }
        }
    });
    return result;
}

const _ProductVariant = (req, data) => {
    let result = {};
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        switch (field) {
            case "available":
                result[key] = getAvailability(data.availability);
                break;
            case "prices":
                result[key] = arrayMapper(req[key], data[key], Price);
                break;
            case "name":
                result.__name = key;
                break;
            case "description":
                result.__description = key;
                break;
            case "id":
                result.__id = { key: key, id: data[key] };
                break;
            case "assets":
                {
                    let images = data.images.map(i => {
                        return {
                            id: i.label || i.url.substring(i.url.lastIndexOf('/') + 1),
                            sources: {
                                uri: i.url
                            }
                        }
                    });
                    result[key] = arrayMapper(req[key], data[key].concat(images), Asset); //assets
                }
                break;
            case "attributes":
                result[key] = arrayMapper(req[key], data[key], Attribute);
                break;
            case "categories":
                result.__categories = key;
                break;
            default:
                if (!field.startsWith("__")) {
                    result[key] = data[key] || null;
                }
                break;
        }
    });
    return result;
}

const ProductVariant = (variant, data, variantsData) => {
    let variants = arrayMapper(variant, variantsData, _ProductVariant);
    //name & description is same of product
    if (variants[0]) {
        if (variants[0].__name) {
            let key = variants[0].__name;
            variants.forEach(v => {
                v[key] = data.masterData && data.masterData.current ? data.masterData.current.name : null;
                delete v.__name;
            });
        }
        if (variants[0].__id) {
            let key = variants[0].__id.key;
            variants.forEach(v => {
                v[key] = v.__id.id && data.id ? data.id + '-' + v.__id.id : null;
                delete v.__id;
            });
        }
        if (variants[0].__description) {
            let key = variants[0].__description;
            variants.forEach(v => {
                v[key] = data.masterData && data.masterData.current ? data.masterData.current.description : null;
                delete v.__description;
            });
        }
        if (variants[0].__categories) {
            let key = variants[0].__categories;
            let categories = arrayMapper(variant[key], data.masterData.current.categories, Category);
            variants.forEach(v => {
                v[key] = categories;
                delete v.__categories;
            });
        }
    }
    return variants;
}

const Product = (req, data) => {
    let masterData = data.masterData ? data.masterData.current : null;
    let result = {};
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        switch (field) {
            case "masterVariantId":
                result[key] = getMasterVariant(masterData, data.id);
                break;
            case "assets":
            case "prices":
            case "attributes":
                result[key] = [];
                break;
            case "name":
            case "description":
            case "sku":
                result[key] = masterData ? masterData[key] : null;
                break;
            case "categories":
                result[key] = arrayMapper(req[key], masterData[key], Category);
                break;
            case "variants":
                result[key] = ProductVariant(req[key], data, masterData[key]);
                break;
            default:
                if (!field.startsWith("__")) {
                    result[key] = data[key] || null;
                }
                break;
        }
    });
    return result;
}

const Category = (req, data) => {
    let result = {};
    Object.keys(req).forEach(key => {
        let field = req[key].__aliasFor || key;
        switch (field) {
            //TODO
            // case "children":
            // case "parents":
            //     result[key] = arrayMapper(req[key], data[key], Category)
            //     break;
            case "mainParentId":
                result[key] = data.parent ? data.parent.id : null;
                break;
            default:
                if (!field.startsWith("__")) {
                    result[key] = data[key] || null;
                }
                break;
        }
    });
    return result;
}

const getMasterVariant = (data, id) => {
    if (data && id && data.masterVariant && data.masterVariant.id) {
        return id + '-' + data.masterVariant.id;
    } else {
        return null;
    }
}

//TODO get from relevant store
const getAvailability = (data) => {
    if (data && data.channels && data.channels.results && data.channels.results[0].availability) {
        return data.channels.results[0].availability.isOnStock;
    } else {
        return null;
    }
}

//define the rootfields in the actual mapper, delegate handling of rootFields to functions
const CTtoCIFMapper = {
    searchProducts: PagedResponse
};

module.exports = CTtoCIFMapper;