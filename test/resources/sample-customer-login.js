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
        'customer': {
            'id': '10f429fb-4e97-4be7-a7da-6c13bf50acdc',
            'version': 2,
            'customerNumber': '20010101',
            'email': 'john.doe@adobe.com',
            'firstName': 'John',
            'lastName': 'Doe',
            'password': '4Rg2LXzBjmprbJMLNhyfpx1+JWdoQ2kAaSh+r++8JjQ=$QyAlyTXGa4s/wN+nwoR6uog1OeMcB/nxP0w1NhAnOcU=',
            'addresses': [],
            'shippingAddressIds': [],
            'billingAddressIds': [],
            'isEmailVerified': false,
            'dateOfBirth': '2001-01-01',
            'companyName': 'Adobe',
            'createdAt': '2017-08-07T13:34:25.854Z',
            'lastModifiedAt': '2017-08-07T13:35:37.769Z',
            'lastMessageSequenceNumber': 1
        },
        'cart': {
            'type': 'Cart',
            'id': '61ec942c-214c-4ea0-a55e-7c5c38d9859c',
            'version': 74,
            'customerId': '10f429fb-4e97-4be7-a7da-6c13bf503ba1',
            'createdAt': '2017-07-28T14:24:36.884Z',
            'lastModifiedAt': '2017-08-07T14:50:02.134Z',
            'lineItems': [
                {
                    'id': 'a5a30c24-7da8-43c4-8b84-3c44d8d2e45d',
                    'productId': 'a60fe100-4121-4b74-b55b-18886579e202',
                    'name': {
                        'en': 'Amsterdam Short-Sleeve Travel Shirt'
                    },
                    'productType': {
                        'typeId': 'product-type',
                        'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4',
                        'version': 13
                    },
                    'productSlug': {
                        'en': 'meotsuamt'
                    },
                    'variant': {
                        'id': 1,
                        'sku': 'meotsuamt-xs',
                        'prices': [
                            {
                                'value': {
                                    'currencyCode': 'USD',
                                    'centAmount': 3900
                                },
                                'id': '67ac6f47-5863-49c7-9772-0cb45a281bf8'
                            },
                            {
                                'value': {
                                    'currencyCode': 'USD',
                                    'centAmount': 2900
                                },
                                'id': 'c00a1e23-0078-4545-b7d8-268e594c43c5',
                                'country': 'US'
                            },
                            {
                                'value': {
                                    'currencyCode': 'USD',
                                    'centAmount': 2900
                                },
                                'id': 'ec6240d2-0fb2-4dd4-a298-b74077633454',
                                'channel': {
                                    'typeId': 'channel',
                                    'id': 'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9'
                                }
                            }
                        ],
                        'images': [
                            {
                                'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meotsuamt-xs-SdO9Ky7l.jpg',
                                'dimensions': {
                                    'w': 1029,
                                    'h': 1080
                                }
                            }
                        ],
                        'attributes': [
                            {
                                'name': 'size',
                                'value': {
                                    'en': 'XS'
                                }
                            },
                            {
                                'name': 'summary',
                                'value': {
                                    'en': 'The Amsterdam travel shirt features a soft, breathable fabric blend that keeps you comfortable on city adventures.'
                                }
                            },
                            {
                                'name': 'features',
                                'value': {
                                    'en': '<ul><li>\tCotton/polyester/spandex blend wicks moisture and has a soft hand\r\n<\\/li><li>\tFabric has a touch of stretch to ease movements\r\n<\\/li><li>\tButton placket lets you adjust the ventilation\r\n<\\/li><li>\tClassic fit that follows body contours without being tight\r\n<\\/li><\\/ul>'
                                }
                            }
                        ],
                        'assets': [],
                        'availability': {
                            'channels': {
                                '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                                    'isOnStock': true,
                                    'availableQuantity': 284
                                },
                                '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                                    'isOnStock': true,
                                    'availableQuantity': 10
                                },
                                'f185f369-4d11-4468-989e-5b3e4650e025': {
                                    'isOnStock': true,
                                    'availableQuantity': 7
                                },
                                'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                    'isOnStock': true,
                                    'availableQuantity': 8
                                },
                                '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                    'isOnStock': true,
                                    'availableQuantity': 9
                                },
                                '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                    'isOnStock': true,
                                    'availableQuantity': 10
                                },
                                'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                    'isOnStock': true,
                                    'availableQuantity': 5
                                },
                                '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                    'isOnStock': true,
                                    'availableQuantity': 3
                                },
                                '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                    'isOnStock': true,
                                    'availableQuantity': 3
                                },
                                'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                    'isOnStock': true,
                                    'availableQuantity': 7
                                },
                                '7119e21a-9835-4056-8312-040e1c0ac704': {
                                    'isOnStock': true,
                                    'availableQuantity': 95
                                },
                                '2af67970-68a9-45f8-ad11-396abe747631': {
                                    'isOnStock': true,
                                    'availableQuantity': 2
                                },
                                'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                                    'isOnStock': false,
                                    'availableQuantity': 0
                                },
                                '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                                    'isOnStock': false,
                                    'availableQuantity': 0
                                },
                                'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                    'isOnStock': true,
                                    'availableQuantity': 647
                                },
                                'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                    'isOnStock': true,
                                    'availableQuantity': 45
                                },
                                'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                    'isOnStock': true,
                                    'availableQuantity': 3
                                },
                                'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                    'isOnStock': true,
                                    'availableQuantity': 8
                                }
                            }
                        }
                    },
                    'price': {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 3900
                        },
                        'id': '67ac6f47-5863-49c7-9772-0cb45a281bf8'
                    },
                    'quantity': 2,
                    'discountedPricePerQuantity': [],
                    'state': [
                        {
                            'quantity': 2,
                            'state': {
                                'typeId': 'state',
                                'id': '56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b'
                            }
                        }
                    ],
                    'priceMode': 'Platform',
                    'totalPrice': {
                        'currencyCode': 'USD',
                        'centAmount': 7800
                    },
                    'lineItemMode': 'Standard'
                },
                {
                    'id': '9a47d9e4-74b0-4253-bea2-0231c7cd0849',
                    'productId': '526dc571-104f-40fb-b761-71781a97910b',
                    'name': {
                        'en': 'El Gordo Down Jacket',
                        'de': 'El Gordo Down Jacke'
                    },
                    "productType": {
                        "typeId": "product-type",
                        "id": "87238665-3388-4cf7-8a3f-bc3dd63724f4",
                        "obj": {
                            "id": "87238665-3388-4cf7-8a3f-bc3dd63724f4",
                            "version": 28,
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
                                },
                                {
                                    "name": "test",
                                    "label": {
                                        "en": "test",
                                        "de": "test"
                                    },
                                    "isRequired": false,
                                    "type": {
                                        "name": "set",
                                        "elementType": {
                                            "name": "text"
                                        }
                                    },
                                    "attributeConstraint": "None",
                                    "isSearchable": true,
                                    "inputHint": "SingleLine",
                                    "displayGroup": "Other"
                                }
                            ],
                            "createdAt": "2016-10-27T15:14:14.046Z",
                            "lastModifiedAt": "2018-02-19T15:57:21.958Z"
                        }
                    },
                    'productSlug': {
                        'en': 'meskwielt'
                    },
                    'variant': {
                        'id': 2,
                        'sku': 'meskwielt.1-s',
                        'prices': [
                            {
                                'value': {
                                    'currencyCode': 'USD',
                                    'centAmount': 11900
                                },
                                'id': 'bd86c757-7da6-4ffd-89bb-5cc95596f4f0'
                            }
                        ],
                        'images': [
                            {
                                'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.1-s-eebwHdOz.jpg',
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
                                    'en': 'S'
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
                                    'availableQuantity': 9
                                },
                                '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                                    'isOnStock': true,
                                    'availableQuantity': 2
                                },
                                'f185f369-4d11-4468-989e-5b3e4650e025': {
                                    'isOnStock': true,
                                    'availableQuantity': 1
                                },
                                'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                    'isOnStock': true,
                                    'availableQuantity': 6
                                },
                                '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                    'isOnStock': true,
                                    'availableQuantity': 519
                                },
                                '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                    'isOnStock': true,
                                    'availableQuantity': 4
                                },
                                'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                    'isOnStock': false,
                                    'availableQuantity': 0
                                },
                                '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                    'isOnStock': true,
                                    'availableQuantity': 3
                                },
                                '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                    'isOnStock': true,
                                    'availableQuantity': 3
                                },
                                'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                    'isOnStock': true,
                                    'availableQuantity': 7
                                },
                                '7119e21a-9835-4056-8312-040e1c0ac704': {
                                    'isOnStock': true,
                                    'availableQuantity': 10
                                },
                                '2af67970-68a9-45f8-ad11-396abe747631': {
                                    'isOnStock': true,
                                    'availableQuantity': 800
                                },
                                'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                                    'isOnStock': true,
                                    'availableQuantity': 511
                                },
                                '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                                    'isOnStock': true,
                                    'availableQuantity': 7
                                },
                                'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                    'isOnStock': false,
                                    'availableQuantity': 0
                                },
                                'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                    'isOnStock': true,
                                    'availableQuantity': 98
                                },
                                'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                    'isOnStock': true,
                                    'availableQuantity': 481
                                },
                                'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                    'isOnStock': true,
                                    'availableQuantity': 3
                                }
                            }
                        }
                    },
                    'price': {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': 'bd86c757-7da6-4ffd-89bb-5cc95596f4f0'
                    },
                    'quantity': 1,
                    'discountedPricePerQuantity': [],
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
                        'centAmount': 11900
                    },
                    'lineItemMode': 'Standard'
                }
            ],
            'cartState': 'Active',
            'totalPrice': {
                'currencyCode': 'USD',
                'centAmount': 19700
            },
            'customLineItems': [],
            'discountCodes': [],
            'inventoryMode': 'None',
            'taxMode': 'Platform',
            'taxRoundingMode': 'HalfEven',
            'refusedGifts': []
        }
    },
    'statusCode': 200
}