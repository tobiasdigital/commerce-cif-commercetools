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
    body: {
        'id': '526dc571-104f-40fb-b761-71781a97910b',
        'version': 703,
        'productType': {
            'typeId': 'product-type',
            'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4',
            'obj': {
                'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4',
                'version': 13,
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
                        'attributeConstraint': 'SameForAll',
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
                        'name': 'testNumber',
                        'label': {
                            'en': 'Test Number type'
                        },
                        'isRequired': false,
                        'type': {
                            'name': 'number'
                        },
                        'attributeConstraint': 'None',
                        'isSearchable': true,
                        'inputHint': 'SingleLine',
                        'displayGroup': 'Other'
                    }
                ],
                'createdAt': '2016-10-27T15:14:14.046Z',
                'lastModifiedAt': '2017-03-13T14:40:06.664Z'
            }
        },
        'name': {
            'de': 'El Gordo Down Jacke',
            'en': 'El Gordo Down Jacket'
        },
        'description': {
            'de': 'Jacke',
            'en': 'jacket'
        },
        'categories': [
            {
                'typeId': 'category',
                'id': '743fd9df-6534-4962-85ab-6cc5e55635c7'
            },
            {
                'typeId': 'category',
                'id': '4e9d5410-4ce5-457e-9c0a-a69346d302ac'
            }
        ],
        'categoryOrderHints': {
            '4e9d5410-4ce5-457e-9c0a-a69346d302ac': '0.7'
        },
        'slug': {
            'en': 'meskwielt'
        },
        'masterVariant': {
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
                },
                {
                    'name': 'orphan',
                    'value': {
                        'en': 'Orphan attribute without ProductType'
                    }
                },
                {
                    'name': 'testNumber',
                    'value': 42
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
        'variants': [
            {
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
                            'de': 'grün',
                            'en': 'green'
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
            {
                'id': 3,
                'sku': 'meskwielt.1-m',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': 'b15e5b14-4f3d-4e4d-8481-1f59adaf392c'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.1-m-Yr0w-PSL.jpg',
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
                            'en': 'M'
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
                            'availableQuantity': 763
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 524
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 439
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 740
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 546
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 167
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 113
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 326
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        }
                    }
                }
            },
            {
                'id': 4,
                'sku': 'meskwielt.1-l',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 13000
                        },
                        'id': '2d75714d-2e2a-4376-9b92-15f26003a687'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.1-l-Y9EqWggK.jpg',
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
                            'de': 'grün',
                            'en': 'green'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'L'
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
                            'availableQuantity': 5
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 546
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 600
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 443
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 860
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 544
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        }
                    }
                }
            },
            {
                'id': 5,
                'sku': 'meskwielt.1-xl',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 13000
                        },
                        'id': 'f9837daa-e53d-4c46-b5b0-437c79fd7190'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.1-xl-2f13Ra7r.jpg',
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
                            'en': 'XL'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 667
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 999
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 689
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        }
                    }
                }
            },
            {
                'id': 6,
                'sku': 'meskwielt.2-xs',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': 'be7b1f63-1742-4bcc-bf1f-bdc0426d49fc'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.2-xs-aNL1imZk.jpg',
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
                            'de': 'lila',
                            'en': 'purple'
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
                            'en': 'With bigger channels and more fill, this extra toasty jacket is ideal as a midlayer or stand-alone in cold climes.'
                        }
                    },
                    {
                        'name': 'features',
                        'value': {
                            'en': '<ul><li>Sharp-looking, ripstop polyester shell, with a waterproof finish, blocks the wind and resists tears and abrasion\r\n<\\/li><li>Finer details include top-quality 800-fill-power goose down, a quilted-through construction, nylon-bound elastic cuffs and a drawcord hem\r\n<\\/li><li>Includes 2 zip hand pockets and 1 interior zip-secure pocket; removable hood<\\/li><\\/ul>'
                        }
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 41
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 480
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 850
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 879
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 758
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 7
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 776
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 307
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 673
                        }
                    }
                }
            },
            {
                'id': 7,
                'sku': 'meskwielt.2-s',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': '6e183e79-a294-4774-a401-a1130f8e6f58'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.2-s-9nQ0z6_l.jpg',
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
                            'en': 'purple',
                            'de': 'lila'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 7
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 519
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 836
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        }
                    }
                }
            },
            {
                'id': 8,
                'sku': 'meskwielt.2-m',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': '590b2ba4-4935-4e9a-b664-b235bf0f2e67'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.2-m-VIrYgr2t.jpg',
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
                            'de': 'lila',
                            'en': 'purple'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'M'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 116
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 231
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 219
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 165
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 954
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 347
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 427
                        }
                    }
                }
            },
            {
                'id': 9,
                'sku': 'meskwielt.2-l',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 13000
                        },
                        'id': 'd5a84f3f-f8fd-43e8-b6ca-299beae4e7c0'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.2-l-uWuca8eH.jpg',
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
                            'en': 'purple',
                            'de': 'lila'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'L'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 997
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 837
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
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        }
                    }
                }
            },
            {
                'id': 10,
                'sku': 'meskwielt.2-xl',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 13000
                        },
                        'id': '4505255b-540b-4bac-a341-8846ce905a1e'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.2-xl-HzWIbFyz.jpg',
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
                            'de': 'lila',
                            'en': 'purple'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'XL'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 938
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 227
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 597
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 232
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 7
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 628
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        }
                    }
                }
            },
            {
                'id': 11,
                'sku': 'meskwielt.3-xs',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': '5f33858a-a361-47e2-90c4-c8a33b3d608e'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.3-xs-phPRQ_sz.jpg',
                        'dimensions': {
                            'w': 997,
                            'h': 1080
                        }
                    }
                ],
                'attributes': [
                    {
                        'name': 'color',
                        'value': {
                            'en': 'red',
                            'de': 'rot'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 982
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 200
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 473
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 616
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 525
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 996
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 631
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 158
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        }
                    }
                }
            },
            {
                'id': 12,
                'sku': 'meskwielt.3-s',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': 'b1dade21-0e8f-4480-a345-ae0145787214'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.3-s-RmdP2fbR.jpg',
                        'dimensions': {
                            'w': 997,
                            'h': 1080
                        }
                    }
                ],
                'attributes': [
                    {
                        'name': 'color',
                        'value': {
                            'de': 'rot',
                            'en': 'red'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 95
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 891
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 7
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 669
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 595
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 98
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        }
                    }
                }
            },
            {
                'id': 13,
                'sku': 'meskwielt.3-m',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 11900
                        },
                        'id': '1d8a5c3b-ade4-4c3b-92b6-fcfd996ee12e'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.3-m-D1J5YBAP.jpg',
                        'dimensions': {
                            'w': 997,
                            'h': 1080
                        }
                    }
                ],
                'attributes': [
                    {
                        'name': 'color',
                        'value': {
                            'en': 'red',
                            'de': 'rot'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'M'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 380
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 385
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 774
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 448
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 691
                        }
                    }
                }
            },
            {
                'id': 14,
                'sku': 'meskwielt.3-l',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 13000
                        },
                        'id': 'f343c4b4-d203-4797-8d0f-4c2bcb4b845c'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.3-l-mKLeIBkw.jpg',
                        'dimensions': {
                            'w': 997,
                            'h': 1080
                        }
                    }
                ],
                'attributes': [
                    {
                        'name': 'color',
                        'value': {
                            'de': 'rot',
                            'en': 'red'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'L'
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
                    }
                ],
                'assets': [],
                'availability': {
                    'channels': {
                        '7c4970ad-9d70-4c75-a7f0-86858f6262e3': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '1565bad8-cc12-4bdb-a17a-949bfa64e543': {
                            'isOnStock': true,
                            'availableQuantity': 9
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 7
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 348
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 6
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': true,
                            'availableQuantity': 857
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 4
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 623
                        }
                    }
                }
            },
            {
                'id': 15,
                'sku': 'meskwielt.3-xl',
                'prices': [
                    {
                        'value': {
                            'currencyCode': 'USD',
                            'centAmount': 13000
                        },
                        'id': 'fe172b82-d0c9-4879-af54-7539a27b9a5a'
                    }
                ],
                'images': [
                    {
                        'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwielt.3-xl-ubW4k1Fq.jpg',
                        'dimensions': {
                            'w': 997,
                            'h': 1080
                        }
                    }
                ],
                'attributes': [
                    {
                        'name': 'color',
                        'value': {
                            'en': 'red',
                            'de': 'rot'
                        }
                    },
                    {
                        'name': 'size',
                        'value': {
                            'en': 'XL'
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
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'f185f369-4d11-4468-989e-5b3e4650e025': {
                            'isOnStock': true,
                            'availableQuantity': 2
                        },
                        'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                            'isOnStock': true,
                            'availableQuantity': 539
                        },
                        '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                            'isOnStock': true,
                            'availableQuantity': 937
                        },
                        '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'ac94868f-834c-4739-ae7b-e0de610e3740': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                            'isOnStock': true,
                            'availableQuantity': 3
                        },
                        '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        'a400d318-8706-4f5c-adec-d199633c7bf3': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        '7119e21a-9835-4056-8312-040e1c0ac704': {
                            'isOnStock': false,
                            'availableQuantity': 0
                        },
                        '2af67970-68a9-45f8-ad11-396abe747631': {
                            'isOnStock': true,
                            'availableQuantity': 5
                        },
                        'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                            'isOnStock': true,
                            'availableQuantity': 742
                        },
                        '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                            'isOnStock': true,
                            'availableQuantity': 1
                        },
                        'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                            'isOnStock': true,
                            'availableQuantity': 8
                        },
                        'c7f7804b-ed5d-411b-991e-ee069509209b': {
                            'isOnStock': true,
                            'availableQuantity': 605
                        },
                        'd130804f-6a87-44d8-b401-351152a4b3ff': {
                            'isOnStock': true,
                            'availableQuantity': 10
                        },
                        'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                            'isOnStock': true,
                            'availableQuantity': 178
                        }
                    }
                }
            }
        ],
        'searchKeywords': {},
        'hasStagedChanges': false,
        'published': true,
        'key': 'meskwielt',
        'taxCategory': {
            'typeId': 'tax-category',
            'id': '389581cc-f8dc-438c-afed-bb63f3b9da91'
        },
        'createdAt': '2017-01-11T14:58:29.432Z',
        'lastModifiedAt': '2017-07-03T14:58:37.076Z'
    }
};
