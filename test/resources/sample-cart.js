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
        'id': '73ad1264-8bde-419c-ac2f-35ea0e553e88',
        'version': 7,
        'createdAt': '2017-07-11T13:23:18.080Z',
        'lastModifiedAt': '2017-07-11T13:23:54.111Z',
        'customerId': 'bf93aa8c-3d3c-48e3-802a-18fb19dfd5ed',
        'lineItems': [
            {
                'id': 'a1a94c6b-9ae0-454b-83c8-dfb112165967',
                'productId': 'a60fe100-4121-4b74-b55b-18886579e202',
                'name': {
                    'en': 'Amsterdam Short-Sleeve Travel Shirt'
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
                                'en': '<ul><li>tCotton/polyester/spandex blend wicks moisture and has a soft handrn</li><li>tFabric has a touch of stretch to ease movementsrn</li><li>tButton placket lets you adjust the ventilationrn</li><li>tClassic fit that follows body contours without being tightrn</li></ul>'
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
                    'centAmount': 3900
                },
                'lineItemMode': 'Standard'
            },
            {
                'id': '3a0d5720-ff03-458c-99fc-f3857a10b1c0',
                'productId': 'a60fe100-4121-4b74-b55b-18886579e202',
                'name': {
                    'en': 'Amsterdam Short-Sleeve Travel Shirt'
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
                    'en': 'meotsuamt'
                },
                'variant': {
                    'id': 3,
                    'sku': 'meotsuamt-m',
                    'prices': [
                        {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 4000
                            },
                            'id': 'a3b756ab-3943-4b56-b5de-50334e2d380a'
                        }
                    ],
                    'images': [
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meotsuamt-m-6BoLTQr7.jpg',
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
                                'en': 'M'
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
                                'en': '<ul><li>tCotton/polyester/spandex blend wicks moisture and has a soft handrn</li><li>tFabric has a touch of stretch to ease movementsrn</li><li>tButton placket lets you adjust the ventilationrn</li><li>tClassic fit that follows body contours without being tightrn</li></ul>'
                            }
                        }
                    ],
                    'assets': [],
                    'availability': {
                        'channels': {
                            '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                                'isOnStock': true,
                                'availableQuantity': 10
                            },
                            '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                                'isOnStock': true,
                                'availableQuantity': 5
                            },
                            'f185f369-4d11-4468-989e-5b3e4650e025': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                'isOnStock': true,
                                'availableQuantity': 520
                            },
                            '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                'isOnStock': true,
                                'availableQuantity': 7
                            },
                            '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                'isOnStock': true,
                                'availableQuantity': 2
                            },
                            'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                'isOnStock': true,
                                'availableQuantity': 461
                            },
                            '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                'isOnStock': true,
                                'availableQuantity': 4
                            },
                            '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                'isOnStock': true,
                                'availableQuantity': 3
                            },
                            'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                'isOnStock': true,
                                'availableQuantity': 1
                            },
                            '7119e21a-9835-4056-8312-040e1c0ac704': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            '2af67970-68a9-45f8-ad11-396abe747631': {
                                'isOnStock': true,
                                'availableQuantity': 741
                            },
                            'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                                'isOnStock': true,
                                'availableQuantity': 8
                            },
                            'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                'isOnStock': true,
                                'availableQuantity': 865
                            },
                            'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                'isOnStock': true,
                                'availableQuantity': 5
                            },
                            'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                'isOnStock': true,
                                'availableQuantity': 4
                            }
                        }
                    }
                },
                'price': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 4000
                    },
                    'id': 'a3b756ab-3943-4b56-b5de-50334e2d380a'
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
                    'centAmount': 4000
                },
                'lineItemMode': 'Standard'
            },
            {
                'id': '722b8c08-3e96-4382-b2d4-7fcf97b1da03',
                'productId': '9af11d79-391e-44a9-92c1-32db9e72034a',
                'name': {
                    'en': 'Basa MP3 Player'
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
                    'en': '30941863'
                },
                'variant': {
                    'id': 1,
                    'sku': '30941863',
                    'prices': [
                        {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 12999
                            },
                            'id': '15a89498-ed8d-4c9c-8ce8-460d25fc9dbf'
                        }
                    ],
                    'images': [
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/30941863-AVgw3wPm.jpg',
                            'dimensions': {
                                'w': 864,
                                'h': 1080
                            }
                        }
                    ],
                    'attributes': [
                        {
                            'name': 'color',
                            'value': {
                                'en': 'white'
                            }
                        },
                        {
                            'name': 'size',
                            'value': {
                                'en': 'One size'
                            }
                        },
                        {
                            'name': 'designer',
                            'value': {
                                'en': 'Basa'
                            }
                        },
                        {
                            'name': 'colorFreeDefinition',
                            'value': {
                                'en': '2009'
                            }
                        }
                    ],
                    'assets': [],
                    'availability': {
                        'isOnStock': true,
                        'availableQuantity': 7,
                        'channels': {
                            '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                                'isOnStock': true,
                                'availableQuantity': 8
                            },
                            '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                                'isOnStock': true,
                                'availableQuantity': 411
                            },
                            'f185f369-4d11-4468-989e-5b3e4650e025': {
                                'isOnStock': true,
                                'availableQuantity': 695
                            },
                            'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                'isOnStock': true,
                                'availableQuantity': 707
                            },
                            '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                'isOnStock': true,
                                'availableQuantity': 888
                            },
                            '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                'isOnStock': true,
                                'availableQuantity': 5
                            },
                            'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                'isOnStock': true,
                                'availableQuantity': 1
                            },
                            '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                'isOnStock': true,
                                'availableQuantity': 858
                            },
                            '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                'isOnStock': true,
                                'availableQuantity': 8
                            },
                            'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                'isOnStock': true,
                                'availableQuantity': 945
                            },
                            '7119e21a-9835-4056-8312-040e1c0ac704': {
                                'isOnStock': true,
                                'availableQuantity': 3
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
                                'isOnStock': true,
                                'availableQuantity': 10
                            },
                            'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                'isOnStock': true,
                                'availableQuantity': 633
                            },
                            'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                'isOnStock': true,
                                'availableQuantity': 4
                            },
                            'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                'isOnStock': true,
                                'availableQuantity': 4
                            },
                            'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                'isOnStock': true,
                                'availableQuantity': 867
                            }
                        }
                    }
                },
                'price': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 12999
                    },
                    'id': '15a89498-ed8d-4c9c-8ce8-460d25fc9dbf'
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
                    'centAmount': 12999
                },
                'lineItemMode': 'Standard'
            },
            {
                'id': 'ff9e7054-1fac-470d-b31d-ce3f2cbe1fd0',
                'productId': 'a9dce173-cd87-4a4c-badf-556d190b152c',
                'name': {
                    'en': 'Candide Trail Short'
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
                    'en': 'wohisucat'
                },
                'variant': {
                    'id': 6,
                    'sku': 'wohisucat-xl',
                    'prices': [
                        {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 4800
                            },
                            'id': 'cefcab1a-28eb-4e4a-b06a-0a7c8183ed75'
                        }
                    ],
                    'images': [
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/wohisucat-xl-KinO6xH7.jpg',
                            'dimensions': {
                                'w': 1620,
                                'h': 1080
                            }
                        }
                    ],
                    'attributes': [
                        {
                            'name': 'size',
                            'value': {
                                'en': 'XL'
                            }
                        },
                        {
                            'name': 'summary',
                            'value': {
                                'en': 'The best of all possible worlds: The Candide short can go just about anywhere thanks to a versatile fabric blend.'
                            }
                        },
                        {
                            'name': 'features',
                            'value': {
                                'en': '<ul><li>Combines the comfort of cotton with the fast drying time of polyester; some stretch is added to enhance easy motion, and fabric is washed for softnessrn</li><li>Waistband lining wicks moisture; zip fly, button closure and belt loopsrn</li><li>Inseam gusset and curved back hems enhance freedom of movement</li></ul>'
                            }
                        }
                    ],
                    'assets': []
                },
                'price': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 4800
                    },
                    'id': 'cefcab1a-28eb-4e4a-b06a-0a7c8183ed75'
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
                    'centAmount': 4800
                },
                'lineItemMode': 'Standard'
            }
        ],
        'cartState': 'Active',
        'totalPrice': {
            'currencyCode': 'USD',
            'centAmount': 25699
        },
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
        'shippingInfo': {
            'shippingMethodName': 'two-business-day',
            'price': {
                'currencyCode': 'USD',
                'centAmount': 2500
            },
            'shippingRate': {
                'price': {
                    'currencyCode': 'USD',
                    'centAmount': 2500
                },
                'freeAbove': {
                    'currencyCode': 'USD',
                    'centAmount': 10000
                }
            },
            'taxRate': {
                'name': 'USA',
                'amount': 0,
                'includedInPrice': true,
                'country': 'US',
                'id': 'UIR0NDyj',
                'subRates': []
            },
            'taxCategory': {
                'typeId': 'tax-category',
                'id': '389581cc-f8dc-438c-afed-bb63f3b9da91'
            },
            'deliveries': [],
            'shippingMethod': {
                'typeId': 'shipping-method',
                'id': '6f0b3638-73a5-4d80-8455-081d3e9f98bb'
            },
            'discountedPrice': {
                'value': {
                    'currencyCode': 'USD',
                    'centAmount': 2250
                },
                'includedDiscounts': [
                    {
                        'discount': {
                            'typeId': 'cart-discount',
                            'id': '1756edd7-9553-421a-a0aa-fc775975ee4e',
                            'obj': {
                                'id': '1756edd7-9553-421a-a0aa-fc775975ee4e',
                                'version': 3,
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
                                'isActive': true,
                                'requiresDiscountCode': false,
                                'sortOrder': '0.1',
                                'references': [],
                                'attributeTypes': {},
                                'cartFieldTypes': {},
                                'lineItemFieldTypes': {},
                                'customLineItemFieldTypes': {},
                                'createdAt': '2017-09-05T13:40:24.786Z',
                                'lastModifiedAt': '2017-09-06T06:44:48.733Z'
                            }
                        },
                        'discountedAmount': {
                            'currencyCode': 'USD',
                            'centAmount': 250
                        }
                    }
                ]
            },
            'taxedPrice': {
                'totalNet': {
                    'currencyCode': 'USD',
                    'centAmount': 2250
                },
                'totalGross': {
                    'currencyCode': 'USD',
                    'centAmount': 2250
                }
            },
            'shippingMethodState': 'MatchesCart'
        },
        'billingAddress': {
            'title': 'Work',
            'salutation': 'Ms',
            'firstName': 'Cat Eye',
            'lastName': 'Nebulae',
            'email': 'cat.eye@zeus.com',
            'phone': '66666666666',
            'mobile': '66666666666',
            'fax': '6666666666',
            'country': 'US',
            'region': 'FarAway',
            'city': 'Constellation',
            'postalCode': '666666',
            'organizationName': 'Zeus',
            'department': 'Production',
            'streetName': 'Draco',
            'streetNumber': '3,262',
            'additionalStreetInfo': 'Light Years',
            'additionalAddressInfo': 'Diameter: ~4.5 Light Years, 26,453,814,179,326 Miles'
        },
        'paymentInfo': {
            'payments': [{
                'typeId': 'payment',
                'id': '7a975b17-4a8e-457b-9338-4229dac84066',
                'obj': {
                    'id': '7a975b17-4a8e-457b-9338-4229dac84066',
                    'version': 1,
                    'amountPlanned': {
                        'currencyCode': 'USD',
                        'centAmount': 35200
                    },
                    'paymentMethodInfo': {
                        'method': 'Cash'
                    },
                    'paymentStatus': {
                        'interfaceCode': '0',
                        'interfaceText': 'success'
                    },
                    'transactions': [],
                    'interfaceInteractions': [],
                    'createdAt': '2017-09-21T13:05:09.350Z',
                    'lastModifiedAt': '2017-09-21T13:05:09.350Z',
                    'lastMessageSequenceNumber': 1
                }
            }]
        },
        'customLineItems': [],
        'discountCodes': [],
        'inventoryMode': 'None',
        'taxMode': 'Platform',
        'taxRoundingMode': 'HalfEven',
        'refusedGifts': []
    },
    'statusCode': 200
};