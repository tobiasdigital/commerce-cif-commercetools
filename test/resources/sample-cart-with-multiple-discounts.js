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

module.exports = {
    'body': {
        "type": "Cart",
        "id": "19b7a8a7-ef0f-49bb-a420-8b7dcf61cf7c",
        "version": 9,
        "createdAt": "2017-09-26T14:00:40.234Z",
        "lastModifiedAt": "2017-09-26T14:01:03.027Z",
        "lineItems": [
            {
                "id": "507858a7-2b00-456e-bea0-c3c3b304f384",
                "productId": "90ed1673-4553-47c6-9336-5cb23947abb2",
                "name": {
                    "en": "Expedition Tech Long-Sleeved Shirt"
                },
                "productType": {
                    "typeId": "product-type",
                    "id": "87238665-3388-4cf7-8a3f-bc3dd63724f4",
                    "obj": {
                        "id": "87238665-3388-4cf7-8a3f-bc3dd63724f4",
                        "version": 13,
                        "name": "we.retail",
                        "description": "we.retail product",
                        "classifier": "Complex",
                        "attributes": [
                            {
                                "name": "color",
                                "label": {
                                    "en": "Color"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "CombinationUnique",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "size",
                                "label": {
                                    "en": "Size"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "CombinationUnique",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "summary",
                                "label": {
                                    "en": "Summary"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "MultiLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "features",
                                "label": {
                                    "en": "Features"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "MultiLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "designer",
                                "label": {
                                    "en": "designer"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "colorFreeDefinition",
                                "label": {
                                    "en": "Year"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            }
                        ],
                        "createdAt": "2016-10-27T15:14:14.046Z",
                        "lastModifiedAt": "2017-03-13T14:40:06.664Z"
                    }
                },
                "productSlug": {
                    "en": "mehiwiext"
                },
                "variant": {
                    "id": 1,
                    "sku": "mehiwiext-s",
                    "prices": [
                        {
                            "value": {
                                "currencyCode": "USD",
                                "centAmount": 5400
                            },
                            "id": "8eb69fa9-a292-407c-af3a-19938853981a"
                        }
                    ],
                    "images": [
                        {
                            "url": "https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/mehiwiext-s-PeVwTNLc.jpg",
                            "dimensions": {
                                "w": 720,
                                "h": 1080
                            }
                        }
                    ],
                    "attributes": [
                        {
                            "name": "size",
                            "value": {
                                "en": "S"
                            }
                        },
                        {
                            "name": "summary",
                            "value": {
                                "en": "High tech fabric means you can stay comfortable wherever you go, from the desert to the tropics to alpine terrain."
                            }
                        },
                        {
                            "name": "features",
                            "value": {
                                "en": "<ul><li>Lightweight nylon fabric wicks moisture, dries quickly and breathes easily for great comfort\r\n<\\/li><li>Integrated mesh ventilation at the back yoke and under the arms helps keep you cool while traveling in warm climates\r\n<\\/li><li>Cargo-style chest pockets provide ample space for travel essentials\r\n<\\/li><li>Button-close chest pockets keep small items secure<\\/li><\\/ul>"
                            }
                        }
                    ],
                    "assets": [],
                    "availability": {
                        "channels": {
                            "7c4970ad-9d70-4c75-a7f0-86858f6262e3": {
                                "isOnStock": true,
                                "availableQuantity": 8
                            },
                            "1565bad8-cc12-4bdb-a17a-949bfa64e543": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "f185f369-4d11-4468-989e-5b3e4650e025": {
                                "isOnStock": true,
                                "availableQuantity": 253
                            },
                            "d7cb1353-d035-41fc-8f3e-815a90be79fe": {
                                "isOnStock": true,
                                "availableQuantity": 364
                            },
                            "798b72b4-9aa7-490d-8165-b95a0ee693c2": {
                                "isOnStock": true,
                                "availableQuantity": 10
                            },
                            "5e39ab7b-ea04-449d-9e52-6867bc5089f0": {
                                "isOnStock": true,
                                "availableQuantity": 2
                            },
                            "ac94868f-834c-4739-ae7b-e0de610e3740": {
                                "isOnStock": true,
                                "availableQuantity": 5
                            },
                            "9dc54b43-5f57-4447-9cc4-f13a92a960a3": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "5ffe693e-b711-4168-8a87-4e765ef574b6": {
                                "isOnStock": true,
                                "availableQuantity": 2
                            },
                            "a400d318-8706-4f5c-adec-d199633c7bf3": {
                                "isOnStock": true,
                                "availableQuantity": 719
                            },
                            "7119e21a-9835-4056-8312-040e1c0ac704": {
                                "isOnStock": true,
                                "availableQuantity": 595
                            },
                            "2af67970-68a9-45f8-ad11-396abe747631": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "c53e02ea-2471-4633-8fb7-92be48df0b9d": {
                                "isOnStock": true,
                                "availableQuantity": 1
                            },
                            "9fc3b5c8-09a5-41e0-85c0-66353a981f1b": {
                                "isOnStock": true,
                                "availableQuantity": 613
                            },
                            "c3242ee4-edbe-4e52-9a06-55e7048775b3": {
                                "isOnStock": true,
                                "availableQuantity": 5
                            },
                            "c7f7804b-ed5d-411b-991e-ee069509209b": {
                                "isOnStock": true,
                                "availableQuantity": 813
                            },
                            "d130804f-6a87-44d8-b401-351152a4b3ff": {
                                "isOnStock": true,
                                "availableQuantity": 407
                            },
                            "cceec9d0-6b7a-41a2-a9b2-cd5d068187d9": {
                                "isOnStock": true,
                                "availableQuantity": 1
                            }
                        }
                    }
                },
                "price": {
                    "value": {
                        "currencyCode": "USD",
                        "centAmount": 5400
                    },
                    "id": "8eb69fa9-a292-407c-af3a-19938853981a"
                },
                "quantity": 6,
                "discountedPrice": {
                    "value": {
                        "currencyCode": "USD",
                        "centAmount": 4972
                    },
                    "includedDiscounts": [
                        {
                            "discount": {
                                "typeId": "cart-discount",
                                "id": "d84aa891-9fa4-4c77-a350-2578c812934c"
                            },
                            "discountedAmount": {
                                "currencyCode": "USD",
                                "centAmount": 285
                            }
                        },
                        {
                            "discount": {
                                "typeId": "cart-discount",
                                "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834"
                            },
                            "discountedAmount": {
                                "currencyCode": "USD",
                                "centAmount": 143
                            }
                        }
                    ]
                },
                "discountedPricePerQuantity": [
                    {
                        "quantity": 1,
                        "discountedPrice": {
                            "value": {
                                "currencyCode": "USD",
                                "centAmount": 4972
                            },
                            "includedDiscounts": [
                                {
                                    "discount": {
                                        "typeId": "cart-discount",
                                        "id": "d84aa891-9fa4-4c77-a350-2578c812934c",
                                        "obj": {
                                            "id": "d84aa891-9fa4-4c77-a350-2578c812934c",
                                            "version": 17,
                                            "value": {
                                                "type": "absolute",
                                                "money": [
                                                    {
                                                        "currencyCode": "USD",
                                                        "centAmount": 2000
                                                    }
                                                ]
                                            },
                                            "cartPredicate": "lineItemTotal(1 = 1) >  \"200.00 USD\"",
                                            "target": {
                                                "type": "lineItems",
                                                "predicate": "1 = 1"
                                            },
                                            "name": {
                                                "en": "$20 discount for orders over $200"
                                            },
                                            "description": {
                                                "en": "Get $20 discount for orders over $200."
                                            },
                                            "stackingMode": "Stacking",
                                            "isActive": true,
                                            "requiresDiscountCode": false,
                                            "sortOrder": "0.9999",
                                            "references": [],
                                            "attributeTypes": {},
                                            "cartFieldTypes": {},
                                            "lineItemFieldTypes": {},
                                            "customLineItemFieldTypes": {},
                                            "createdAt": "2017-08-18T08:34:30.484Z",
                                            "lastModifiedAt": "2017-08-24T12:11:09.040Z"
                                        }
                                    },
                                    "discountedAmount": {
                                        "currencyCode": "USD",
                                        "centAmount": 285
                                    }
                                },
                                {
                                    "discount": {
                                        "typeId": "cart-discount",
                                        "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834",
                                        "obj": {
                                            "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834",
                                            "version": 2,
                                            "value": {
                                                "type": "absolute",
                                                "money": [
                                                    {
                                                        "currencyCode": "USD",
                                                        "centAmount": 1000
                                                    }
                                                ]
                                            },
                                            "cartPredicate": "lineItemTotal(1 = 1) >  \"100.00 USD\"",
                                            "target": {
                                                "type": "lineItems",
                                                "predicate": "1 = 1"
                                            },
                                            "name": {
                                                "en": "$10 discount for orders over $100"
                                            },
                                            "description": {
                                                "en": "Get $10 discount for orders over $100."
                                            },
                                            "stackingMode": "Stacking",
                                            "isActive": true,
                                            "requiresDiscountCode": false,
                                            "sortOrder": "0.9997",
                                            "references": [],
                                            "attributeTypes": {},
                                            "cartFieldTypes": {},
                                            "lineItemFieldTypes": {},
                                            "customLineItemFieldTypes": {},
                                            "createdAt": "2017-09-26T13:38:45.085Z",
                                            "lastModifiedAt": "2017-09-26T13:39:00.126Z"
                                        }
                                    },
                                    "discountedAmount": {
                                        "currencyCode": "USD",
                                        "centAmount": 143
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "quantity": 5,
                        "discountedPrice": {
                            "value": {
                                "currencyCode": "USD",
                                "centAmount": 4971
                            },
                            "includedDiscounts": [
                                {
                                    "discount": {
                                        "typeId": "cart-discount",
                                        "id": "d84aa891-9fa4-4c77-a350-2578c812934c",
                                        "obj": {
                                            "id": "d84aa891-9fa4-4c77-a350-2578c812934c",
                                            "version": 17,
                                            "value": {
                                                "type": "absolute",
                                                "money": [
                                                    {
                                                        "currencyCode": "USD",
                                                        "centAmount": 2000
                                                    }
                                                ]
                                            },
                                            "cartPredicate": "lineItemTotal(1 = 1) >  \"200.00 USD\"",
                                            "target": {
                                                "type": "lineItems",
                                                "predicate": "1 = 1"
                                            },
                                            "name": {
                                                "en": "$20 discount for orders over $200"
                                            },
                                            "description": {
                                                "en": "Get $20 discount for orders over $200."
                                            },
                                            "stackingMode": "Stacking",
                                            "isActive": true,
                                            "requiresDiscountCode": false,
                                            "sortOrder": "0.9999",
                                            "references": [],
                                            "attributeTypes": {},
                                            "cartFieldTypes": {},
                                            "lineItemFieldTypes": {},
                                            "customLineItemFieldTypes": {},
                                            "createdAt": "2017-08-18T08:34:30.484Z",
                                            "lastModifiedAt": "2017-08-24T12:11:09.040Z"
                                        }
                                    },
                                    "discountedAmount": {
                                        "currencyCode": "USD",
                                        "centAmount": 286
                                    }
                                },
                                {
                                    "discount": {
                                        "typeId": "cart-discount",
                                        "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834",
                                        "obj": {
                                            "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834",
                                            "version": 2,
                                            "value": {
                                                "type": "absolute",
                                                "money": [
                                                    {
                                                        "currencyCode": "USD",
                                                        "centAmount": 1000
                                                    }
                                                ]
                                            },
                                            "cartPredicate": "lineItemTotal(1 = 1) >  \"100.00 USD\"",
                                            "target": {
                                                "type": "lineItems",
                                                "predicate": "1 = 1"
                                            },
                                            "name": {
                                                "en": "$10 discount for orders over $100"
                                            },
                                            "description": {
                                                "en": "Get $10 discount for orders over $100."
                                            },
                                            "stackingMode": "Stacking",
                                            "isActive": true,
                                            "requiresDiscountCode": false,
                                            "sortOrder": "0.9997",
                                            "references": [],
                                            "attributeTypes": {},
                                            "cartFieldTypes": {},
                                            "lineItemFieldTypes": {},
                                            "customLineItemFieldTypes": {},
                                            "createdAt": "2017-09-26T13:38:45.085Z",
                                            "lastModifiedAt": "2017-09-26T13:39:00.126Z"
                                        }
                                    },
                                    "discountedAmount": {
                                        "currencyCode": "USD",
                                        "centAmount": 143
                                    }
                                }
                            ]
                        }
                    }
                ],
                "state": [
                    {
                        "quantity": 6,
                        "state": {
                            "typeId": "state",
                            "id": "56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b"
                        }
                    }
                ],
                "priceMode": "Platform",
                "totalPrice": {
                    "currencyCode": "USD",
                    "centAmount": 29827
                },
                "lineItemMode": "Standard"
            },
            {
                "id": "c67d7657-4113-4753-a8b9-40d60faea3fb",
                "productId": "90ed1673-4553-47c6-9336-5cb23947abb2",
                "name": {
                    "en": "Expedition Tech Long-Sleeved Shirt"
                },
                "productType": {
                    "typeId": "product-type",
                    "id": "87238665-3388-4cf7-8a3f-bc3dd63724f4",
                    "obj": {
                        "id": "87238665-3388-4cf7-8a3f-bc3dd63724f4",
                        "version": 13,
                        "name": "we.retail",
                        "description": "we.retail product",
                        "classifier": "Complex",
                        "attributes": [
                            {
                                "name": "color",
                                "label": {
                                    "en": "Color"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "CombinationUnique",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "size",
                                "label": {
                                    "en": "Size"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "CombinationUnique",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "summary",
                                "label": {
                                    "en": "Summary"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "MultiLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "features",
                                "label": {
                                    "en": "Features"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "MultiLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "designer",
                                "label": {
                                    "en": "designer"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            },
                            {
                                "name": "colorFreeDefinition",
                                "label": {
                                    "en": "Year"
                                },
                                "isRequired": false,
                                "type": {
                                    "name": "ltext"
                                },
                                "attributeConstraint": "None",
                                "isSearchable": true,
                                "inputHint": "SingleLine",
                                "displayGroup": "Other"
                            }
                        ],
                        "createdAt": "2016-10-27T15:14:14.046Z",
                        "lastModifiedAt": "2017-03-13T14:40:06.664Z"
                    }
                },
                "productSlug": {
                    "en": "mehiwiext"
                },
                "variant": {
                    "id": 2,
                    "sku": "mehiwiext-m",
                    "prices": [
                        {
                            "value": {
                                "currencyCode": "USD",
                                "centAmount": 5400
                            },
                            "id": "f1c69f46-6f4f-411c-95cc-a05be1c4eec0"
                        }
                    ],
                    "images": [
                        {
                            "url": "https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/mehiwiext-m-ACEMJVDr.jpg",
                            "dimensions": {
                                "w": 720,
                                "h": 1080
                            }
                        }
                    ],
                    "attributes": [
                        {
                            "name": "size",
                            "value": {
                                "en": "M"
                            }
                        },
                        {
                            "name": "summary",
                            "value": {
                                "en": "High tech fabric means you can stay comfortable wherever you go, from the desert to the tropics to alpine terrain."
                            }
                        },
                        {
                            "name": "features",
                            "value": {
                                "en": "<ul><li>Lightweight nylon fabric wicks moisture, dries quickly and breathes easily for great comfort\r\n<\\/li><li>Integrated mesh ventilation at the back yoke and under the arms helps keep you cool while traveling in warm climates\r\n<\\/li><li>Cargo-style chest pockets provide ample space for travel essentials\r\n<\\/li><li>Button-close chest pockets keep small items secure<\\/li><\\/ul>"
                            }
                        }
                    ],
                    "assets": [],
                    "availability": {
                        "channels": {
                            "7c4970ad-9d70-4c75-a7f0-86858f6262e3": {
                                "isOnStock": true,
                                "availableQuantity": 451
                            },
                            "1565bad8-cc12-4bdb-a17a-949bfa64e543": {
                                "isOnStock": true,
                                "availableQuantity": 251
                            },
                            "f185f369-4d11-4468-989e-5b3e4650e025": {
                                "isOnStock": true,
                                "availableQuantity": 9
                            },
                            "d7cb1353-d035-41fc-8f3e-815a90be79fe": {
                                "isOnStock": true,
                                "availableQuantity": 3
                            },
                            "798b72b4-9aa7-490d-8165-b95a0ee693c2": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "5e39ab7b-ea04-449d-9e52-6867bc5089f0": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "ac94868f-834c-4739-ae7b-e0de610e3740": {
                                "isOnStock": true,
                                "availableQuantity": 6
                            },
                            "9dc54b43-5f57-4447-9cc4-f13a92a960a3": {
                                "isOnStock": true,
                                "availableQuantity": 329
                            },
                            "5ffe693e-b711-4168-8a87-4e765ef574b6": {
                                "isOnStock": true,
                                "availableQuantity": 10
                            },
                            "a400d318-8706-4f5c-adec-d199633c7bf3": {
                                "isOnStock": true,
                                "availableQuantity": 7
                            },
                            "7119e21a-9835-4056-8312-040e1c0ac704": {
                                "isOnStock": true,
                                "availableQuantity": 2
                            },
                            "2af67970-68a9-45f8-ad11-396abe747631": {
                                "isOnStock": true,
                                "availableQuantity": 7
                            },
                            "c53e02ea-2471-4633-8fb7-92be48df0b9d": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "9fc3b5c8-09a5-41e0-85c0-66353a981f1b": {
                                "isOnStock": true,
                                "availableQuantity": 9
                            },
                            "c3242ee4-edbe-4e52-9a06-55e7048775b3": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            },
                            "c7f7804b-ed5d-411b-991e-ee069509209b": {
                                "isOnStock": true,
                                "availableQuantity": 9
                            },
                            "d130804f-6a87-44d8-b401-351152a4b3ff": {
                                "isOnStock": true,
                                "availableQuantity": 1
                            },
                            "cceec9d0-6b7a-41a2-a9b2-cd5d068187d9": {
                                "isOnStock": false,
                                "availableQuantity": 0
                            }
                        }
                    }
                },
                "price": {
                    "value": {
                        "currencyCode": "USD",
                        "centAmount": 5400
                    },
                    "id": "f1c69f46-6f4f-411c-95cc-a05be1c4eec0"
                },
                "quantity": 1,
                "discountedPrice": {
                    "value": {
                        "currencyCode": "USD",
                        "centAmount": 4973
                    },
                    "includedDiscounts": [
                        {
                            "discount": {
                                "typeId": "cart-discount",
                                "id": "d84aa891-9fa4-4c77-a350-2578c812934c"
                            },
                            "discountedAmount": {
                                "currencyCode": "USD",
                                "centAmount": 285
                            }
                        },
                        {
                            "discount": {
                                "typeId": "cart-discount",
                                "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834"
                            },
                            "discountedAmount": {
                                "currencyCode": "USD",
                                "centAmount": 142
                            }
                        }
                    ]
                },
                "discountedPricePerQuantity": [
                    {
                        "quantity": 1,
                        "discountedPrice": {
                            "value": {
                                "currencyCode": "USD",
                                "centAmount": 4973
                            },
                            "includedDiscounts": [
                                {
                                    "discount": {
                                        "typeId": "cart-discount",
                                        "id": "d84aa891-9fa4-4c77-a350-2578c812934c",
                                        "obj": {
                                            "id": "d84aa891-9fa4-4c77-a350-2578c812934c",
                                            "version": 17,
                                            "value": {
                                                "type": "absolute",
                                                "money": [
                                                    {
                                                        "currencyCode": "USD",
                                                        "centAmount": 2000
                                                    }
                                                ]
                                            },
                                            "cartPredicate": "lineItemTotal(1 = 1) >  \"200.00 USD\"",
                                            "target": {
                                                "type": "lineItems",
                                                "predicate": "1 = 1"
                                            },
                                            "name": {
                                                "en": "$20 discount for orders over $200"
                                            },
                                            "description": {
                                                "en": "Get $20 discount for orders over $200."
                                            },
                                            "stackingMode": "Stacking",
                                            "isActive": true,
                                            "requiresDiscountCode": false,
                                            "sortOrder": "0.9999",
                                            "references": [],
                                            "attributeTypes": {},
                                            "cartFieldTypes": {},
                                            "lineItemFieldTypes": {},
                                            "customLineItemFieldTypes": {},
                                            "createdAt": "2017-08-18T08:34:30.484Z",
                                            "lastModifiedAt": "2017-08-24T12:11:09.040Z"
                                        }
                                    },
                                    "discountedAmount": {
                                        "currencyCode": "USD",
                                        "centAmount": 285
                                    }
                                },
                                {
                                    "discount": {
                                        "typeId": "cart-discount",
                                        "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834",
                                        "obj": {
                                            "id": "80ac44bd-bcb9-414f-afb7-fe48207a2834",
                                            "version": 2,
                                            "value": {
                                                "type": "absolute",
                                                "money": [
                                                    {
                                                        "currencyCode": "USD",
                                                        "centAmount": 1000
                                                    }
                                                ]
                                            },
                                            "cartPredicate": "lineItemTotal(1 = 1) >  \"100.00 USD\"",
                                            "target": {
                                                "type": "lineItems",
                                                "predicate": "1 = 1"
                                            },
                                            "name": {
                                                "en": "$10 discount for orders over $100"
                                            },
                                            "description": {
                                                "en": "Get $10 discount for orders over $100."
                                            },
                                            "stackingMode": "Stacking",
                                            "isActive": true,
                                            "requiresDiscountCode": false,
                                            "sortOrder": "0.9997",
                                            "references": [],
                                            "attributeTypes": {},
                                            "cartFieldTypes": {},
                                            "lineItemFieldTypes": {},
                                            "customLineItemFieldTypes": {},
                                            "createdAt": "2017-09-26T13:38:45.085Z",
                                            "lastModifiedAt": "2017-09-26T13:39:00.126Z"
                                        }
                                    },
                                    "discountedAmount": {
                                        "currencyCode": "USD",
                                        "centAmount": 142
                                    }
                                }
                            ]
                        }
                    }
                ],
                "state": [
                    {
                        "quantity": 1,
                        "state": {
                            "typeId": "state",
                            "id": "56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b"
                        }
                    }
                ],
                "priceMode": "Platform",
                "totalPrice": {
                    "currencyCode": "USD",
                    "centAmount": 4973
                },
                "lineItemMode": "Standard"
            }
        ],
        "cartState": "Active",
        "totalPrice": {
            "currencyCode": "USD",
            "centAmount": 34800
        },
        "customLineItems": [],
        "discountCodes": [],
        "inventoryMode": "None",
        "taxMode": "Platform",
        "taxRoundingMode": "HalfEven",
        "refusedGifts": []
    }
};