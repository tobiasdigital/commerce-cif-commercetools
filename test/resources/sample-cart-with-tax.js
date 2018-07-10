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
        'type': 'Cart',
        'id': '0457633c-1885-49cb-a403-d2d1c0743a4a',
        'version': 14,
        'createdAt': '2018-03-13T06:46:24.588Z',
        'lastModifiedAt': '2018-03-13T07:07:59.058Z',
        'lineItems': [
            {
                'id': '6e20e59d-9ede-4ff4-97c9-8c5c68d4f81e',
                'productId': '526dc571-104f-40fb-b761-71781a97910b',
                'name': {
                    'de': 'El Gordo Dauenjacke',
                    'en': 'El Gordo Down Jacket'
                },
                'productType': {
                    'typeId': 'product-type',
                    'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4',
                    'obj': {
                        'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4',
                        'version': 28,
                        'name': 'we.retail',
                        'description': 'we.retail product',
                        'classifier': 'Complex',
                        'attributes': [
                            {
                                'name': 'color',
                                'label': {
                                    'en': 'Color'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'ltext'
                                },
                                'attributeConstraint': 'CombinationUnique',
                                'isSearchable': true,
                                'inputHint': 'SingleLine',
                                'displayGroup': 'Other'
                            },
                            {
                                'name': 'size',
                                'label': {
                                    'en': 'Size'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'ltext'
                                },
                                'attributeConstraint': 'CombinationUnique',
                                'isSearchable': true,
                                'inputHint': 'SingleLine',
                                'displayGroup': 'Other'
                            },
                            {
                                'name': 'summary',
                                'label': {
                                    'en': 'Summary'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'ltext'
                                },
                                'attributeConstraint': 'None',
                                'isSearchable': true,
                                'inputHint': 'MultiLine',
                                'displayGroup': 'Other'
                            },
                            {
                                'name': 'features',
                                'label': {
                                    'en': 'Features'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'ltext'
                                },
                                'attributeConstraint': 'None',
                                'isSearchable': true,
                                'inputHint': 'MultiLine',
                                'displayGroup': 'Other'
                            },
                            {
                                'name': 'designer',
                                'label': {
                                    'en': 'designer'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'ltext'
                                },
                                'attributeConstraint': 'None',
                                'isSearchable': true,
                                'inputHint': 'SingleLine',
                                'displayGroup': 'Other'
                            },
                            {
                                'name': 'colorFreeDefinition',
                                'label': {
                                    'en': 'Year'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'ltext'
                                },
                                'attributeConstraint': 'None',
                                'isSearchable': true,
                                'inputHint': 'SingleLine',
                                'displayGroup': 'Other'
                            },
                            {
                                'name': 'test',
                                'label': {
                                    'en': 'test',
                                    'de': 'test'
                                },
                                'isRequired': false,
                                'type': {
                                    'name': 'set',
                                    'elementType': {
                                        'name': 'text'
                                    }
                                },
                                'attributeConstraint': 'None',
                                'isSearchable': true,
                                'inputHint': 'SingleLine',
                                'displayGroup': 'Other'
                            }
                        ],
                        'createdAt': '2016-10-27T15:14:14.046Z',
                        'lastModifiedAt': '2018-02-19T15:57:21.958Z'
                    }
                },
                'productSlug': {
                    'en': 'meskwielt'
                },
                'variant': {
                    'id': 1,
                    'sku': 'meskwielt.1-xs',
                    'prices': [
                        {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 11900
                            },
                            'id': '3fc8c089-ce1f-4090-9d70-4fcb6561889d'
                        },
                        {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 10900
                            },
                            'id': '01e31055-23dc-4a08-bb35-ef8f97e15f9a',
                            'channel': {
                                'typeId': 'channel',
                                'id': 'ac94868f-834c-4739-ae7b-e0de610e3740'
                            }
                        }
                    ],
                    'images': [
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/El+Gordo+Red-tPj6M5W2.jpg',
                            'label': 'Red Jacket',
                            'dimensions': {
                                'w': 997,
                                'h': 1080
                            }
                        },
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/El+Gordo+Purple-2Am2Nz0x.jpg',
                            'label': 'Blue Jacket',
                            'dimensions': {
                                'w': 975,
                                'h': 1080
                            }
                        },
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.1-s-eebwHd-ebqZzrsX.jpg',
                            'label': 'Green Jacket',
                            'dimensions': {
                                'w': 975,
                                'h': 1080
                            }
                        }
                    ],
                    'attributes': [
                        {
                            'name': 'color',
                            'value': {
                                'en': 'green',
                                'de': 'grün'
                            }
                        },
                        {
                            'name': 'size',
                            'value': {
                                'en': 'XS'
                            }
                        },
                        {
                            'name': 'summary',
                            'value': {
                                'en': 'With bigger channels and more fill, this extra toasty jacket is ideal as a midlayer or stand-alone in cold climes.\n\n<ul><li>Sharp-looking, ripstop polyester shell, with a waterproof finish, blocks the wind and resists tears and abrasion\n</li><li>Finer details include top-quality 800-fill-power goose down, a quilted-through construction, nylon-bound elastic cuffs and a drawcord hem\n</li><li>Includes 2 zip hand pockets and 1 interior zip-secure pocket; removable hood</li></ul>'
                            }
                        },
                        {
                            'name': 'features',
                            'value': {
                                'en': '<ul><li>Sharp-looking, ripstop polyester shell, with a waterproof finish, blocks the wind and resists tears and abrasion\r\n<\\/li><li>Finer details include top-quality 800-fill-power goose down, a quilted-through construction, nylon-bound elastic cuffs and a drawcord hem\r\n<\\/li><li>Includes 2 zip hand pockets and 1 interior zip-secure pocket; removable hood<\\/li><\\/ul>'
                            }
                        },
                        {
                            'name': 'colorFreeDefinition',
                            'value': {
                                'en': '2017'
                            }
                        },
                        {
                            'name': 'designer',
                            'value': {
                                'en': 'Patagonia'
                            }
                        }
                    ],
                    'assets': [],
                    'availability': {
                        'channels': {
                            '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                                'isOnStock': true,
                                'availableQuantity': 157
                            },
                            '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            'f185f369-4d11-4468-989e-5b3e4650e025': {
                                'isOnStock': true,
                                'availableQuantity': 9
                            },
                            'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                'isOnStock': true,
                                'availableQuantity': 3
                            },
                            '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                'isOnStock': true,
                                'availableQuantity': 287
                            },
                            '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                'isOnStock': true,
                                'availableQuantity': 9
                            },
                            'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                'isOnStock': true,
                                'availableQuantity': 8
                            },
                            '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                'isOnStock': true,
                                'availableQuantity': 4
                            },
                            '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                'isOnStock': true,
                                'availableQuantity': 10
                            },
                            'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                'isOnStock': true,
                                'availableQuantity': 161
                            },
                            '7119e21a-9835-4056-8312-040e1c0ac704': {
                                'isOnStock': true,
                                'availableQuantity': 5
                            },
                            '2af67970-68a9-45f8-ad11-396abe747631': {
                                'isOnStock': true,
                                'availableQuantity': 9
                            },
                            'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                                'isOnStock': true,
                                'availableQuantity': 8
                            },
                            '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                                'isOnStock': true,
                                'availableQuantity': 804
                            },
                            'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                'isOnStock': true,
                                'availableQuantity': 6
                            },
                            'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                'isOnStock': true,
                                'availableQuantity': 3
                            },
                            'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                'isOnStock': true,
                                'availableQuantity': 6
                            },
                            'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                'isOnStock': true,
                                'availableQuantity': 554
                            }
                        }
                    }
                },
                'price': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 11900
                    },
                    'id': '3fc8c089-ce1f-4090-9d70-4fcb6561889d'
                },
                'quantity': 1,
                'discountedPrice': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 10900
                    },
                    'includedDiscounts': [
                        {
                            'discount': {
                                'typeId': 'cart-discount',
                                'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                            },
                            'discountedAmount': {
                                'currencyCode': 'USD',
                                'centAmount': 1000
                            }
                        }
                    ]
                },
                'discountedPricePerQuantity': [
                    {
                        'quantity': 1,
                        'discountedPrice': {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 10900
                            },
                            'includedDiscounts': [
                                {
                                    'discount': {
                                        'typeId': 'cart-discount',
                                        'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834',
                                        'obj': {
                                            'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834',
                                            'version': 22,
                                            'value': {
                                                'type': 'absolute',
                                                'money': [
                                                    {
                                                        'currencyCode': 'USD',
                                                        'centAmount': 1000
                                                    }
                                                ]
                                            },
                                            'cartPredicate': 'lineItemTotal(1 = 1) >  \'100.00 USD\'',
                                            'target': {
                                                'type': 'lineItems',
                                                'predicate': '1 = 1'
                                            },
                                            'name': {
                                                'en': '$10 discount for orders over $100'
                                            },
                                            'description': {
                                                'en': 'Get $10 discount for orders over $100.'
                                            },
                                            'stackingMode': 'Stacking',
                                            'isActive': true,
                                            'requiresDiscountCode': false,
                                            'sortOrder': '0.9997',
                                            'references': [],
                                            'attributeTypes': {},
                                            'cartFieldTypes': {},
                                            'lineItemFieldTypes': {},
                                            'customLineItemFieldTypes': {},
                                            'createdAt': '2017-09-26T13:38:45.085Z',
                                            'lastModifiedAt': '2017-11-15T08:22:40.515Z'
                                        }
                                    },
                                    'discountedAmount': {
                                        'currencyCode': 'USD',
                                        'centAmount': 1000
                                    }
                                }
                            ]
                        }
                    }
                ],
                'taxRate': {
                    'name': 'USA',
                    'amount': 0.1,
                    'includedInPrice': true,
                    'country': 'US',
                    'id': 'Zt9wXpOc',
                    'subRates': []
                },
                'state': [
                    {
                        'quantity': 1,
                        'state': {
                            'typeId': 'state',
                            'id': '56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b'
                        }
                    }
                ],
                'priceMode': 'Platform',
                'totalPrice': {
                    'currencyCode': 'USD',
                    'centAmount': 10900
                },
                'taxedPrice': {
                    'totalNet': {
                        'currencyCode': 'USD',
                        'centAmount': 9909
                    },
                    'totalGross': {
                        'currencyCode': 'USD',
                        'centAmount': 10900
                    }
                },
                'lineItemMode': 'Standard'
            }
        ],
        'cartState': 'Active',
        'totalPrice': {
            'currencyCode': 'USD',
            'centAmount': 11800
        },
        'taxedPrice': {
            'totalNet': {
                'currencyCode': 'USD',
                'centAmount': 10727
            },
            'totalGross': {
                'currencyCode': 'USD',
                'centAmount': 11800
            },
            'taxPortions': [
                {
                    'rate': 0.1,
                    'amount': {
                        'currencyCode': 'USD',
                        'centAmount': 1073
                    },
                    'name': 'USA'
                }
            ]
        },
        'shippingInfo': {
            'shippingMethodName': 'ground-shipping',
            'price': {
                'currencyCode': 'USD',
                'centAmount': 1000
            },
            'shippingRate': {
                'price': {
                    'currencyCode': 'USD',
                    'centAmount': 1000
                },
                'tiers': []
            },
            'taxRate': {
                'name': 'USA',
                'amount': 0.1,
                'includedInPrice': true,
                'country': 'US',
                'id': 'Zt9wXpOc',
                'subRates': []
            },
            'taxCategory': {
                'typeId': 'tax-category',
                'id': '389581cc-f8dc-438c-afed-bb63f3b9da91'
            },
            'deliveries': [],
            'shippingMethod': {
                'typeId': 'shipping-method',
                'id': '34e79a6b-13f0-45ba-989e-dfabe3230d07'
            },
            'discountedPrice': {
                'value': {
                    'currencyCode': 'USD',
                    'centAmount': 900
                },
                'includedDiscounts': [
                    {
                        'discount': {
                            'typeId': 'cart-discount',
                            'id': '1756edd7-9553-421a-a0aa-fc775975ee4e',
                            'obj': {
                                'id': '1756edd7-9553-421a-a0aa-fc775975ee4e',
                                'version': 5,
                                'value': {
                                    'type': 'relative',
                                    'permyriad': 1000
                                },
                                'cartPredicate': '1=1',
                                'target': {
                                    'type': 'shipping'
                                },
                                'name': {
                                    'en': '10% off'
                                },
                                'stackingMode': 'Stacking',
                                'isActive': true,
                                'requiresDiscountCode': false,
                                'sortOrder': '0.1',
                                'references': [],
                                'attributeTypes': {},
                                'cartFieldTypes': {},
                                'lineItemFieldTypes': {},
                                'customLineItemFieldTypes': {},
                                'createdAt': '2017-09-05T13:40:24.786Z',
                                'lastModifiedAt': '2017-11-10T15:12:36.956Z'
                            }
                        },
                        'discountedAmount': {
                            'currencyCode': 'USD',
                            'centAmount': 100
                        }
                    }
                ]
            },
            'taxedPrice': {
                'totalNet': {
                    'currencyCode': 'USD',
                    'centAmount': 818
                },
                'totalGross': {
                    'currencyCode': 'USD',
                    'centAmount': 900
                }
            },
            'shippingMethodState': 'MatchesCart'
        },
        'customLineItems': [],
        'discountCodes': [],
        'inventoryMode': 'None',
        'taxMode': 'Platform',
        'taxRoundingMode': 'HalfEven',
        'taxCalculationMode': 'LineItemLevel',
        'refusedGifts': [],
        'origin': 'Customer',
        'shippingAddress': {
            'title': 'Work',
            'salutation': 'Ms',
            'firstName': 'Cat Eye',
            'lastName': 'Nebulae',
            'streetName': 'Draco',
            'streetNumber': '3,262',
            'additionalStreetInfo': 'Light Years',
            'postalCode': '666666',
            'city': 'Constellation',
            'region': 'FarAway',
            'country': 'US',
            'company': 'Zeus',
            'department': 'Production',
            'phone': '66666666666',
            'mobile': '66666666666',
            'email': 'cat.eye@zeus.com',
            'fax': '6666666666',
            'additionalAddressInfo': 'Diameter: ~4.5 Light Years, 26,453,814,179,326 Miles'
        },
        'itemShippingAddresses': []
    },
    'statusCode': 200
};