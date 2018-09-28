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

const acceptLanguages = ['en', 'de', 'es'];

const Category = {
    //TODO: handle children & parents
    ignore: ["mainParentId", "children", "parents"],
    description: {
        args: {
            acceptLanguage: acceptLanguages
        }
    },
    name: {
        args: {
            acceptLanguage: acceptLanguages
        }
    },
    adders: [{
        when: "mainParentId",
        add: ["parent.id"]
    }]
};

const Price = {
    ignore: ["amount", "currency"],
    adders: [
        {
            when: "currency",
            add: ["value.currencyCode"]
        },
        {
            when: "amount",
            add: ["value.centAmount"]
        },
    ]
};

const Asset = {
    ignore: ["url"],
    adders: [{
        when: "url",
        add: ["sources.uri"]
    }]
};

const Attribute = {
    alias: "attributesRaw",
    moveFields: [{
        fields: ["name", "isVariantAxis"],
        to: "attributeDefinition"
    }],
    name: {
        alias: "label",
        args: {
            acceptLanguage: acceptLanguages
        }
    },
    id: {
        alias: "name"
    },
    isVariantAxis: {
        alias: "attributeConstraint"
    }
};

const ProductVariant = {
    alias: "allVariants",
    ignore: ["available", "name", "createdAt", "lastModifiedAt", "description"], //categories is already moved
    prices: Price,
    adders: [
        {
            when: "available",
            add: ["availability.channels.results.availability.isOnStock"]
        },
        {
            when: "assets",
            add: ["images.url", "images.label"]
        },
        {
            when: ["createdAt", "lastModifiedAt", "name", "description"],
            add: ["sku"]    //prevent empty query
        }
    ],
    assets: Asset,
    attributes: Attribute
};

const Product = {
    adders: [{
        when: "masterVariantId",
        add: ["id", "masterData.current.masterVariant.id"]
    },
    {
        when: "variants.name",
        add: ["name"]
    },
    {
        when: "variants.id",
        add: ["id"]
    },
    {
        when: "variants.description",
        add: ["description"]
    },
    {
        when: ["assets", "prices", "attributes"],
        add: ["createdAt"] //prevent empty query
    }],
    ignore: ["assets", "masterVariantId", "prices", "attributes"],
    moveFields: [
        {
            from: "variants.categories",
            to: "categories"
        },
        {
            fields: ["name", "description", "categories", "variants", "sku"],
            to: "masterData.current"
        }
    ],
    name: {
        args: {
            acceptLanguage: acceptLanguages
        }
    },
    description: {
        args: {
            acceptLanguage: acceptLanguages
        }
    },
    sku: {
        alias: "slug",
        args: {
            acceptLanguage: acceptLanguages
        }
    },
    categories: Category,
    variants: ProductVariant
};

const PagedResponse = {
    ignore: ["facets"],
    alias: "products",
    results: Product
};

const TransformRules = {
    searchProducts: PagedResponse
}

module.exports = TransformRules;