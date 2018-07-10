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
        'type': 'Order',
        'id': '8fcf6f14-49ac-4531-b48c-d72a32a169c8',
        'version': 1,
        'createdAt': '2017-09-27T13:32:20.569Z',
        'lastModifiedAt': '2017-09-27T13:32:20.569Z',
        'totalPrice': {
            'currencyCode': 'USD',
            'centAmount': 15200
        },
        'taxedPrice': {
            'totalNet': {
                'currencyCode': 'USD',
                'centAmount': 15200
            },
            'totalGross': {
                'currencyCode': 'USD',
                'centAmount': 15200
            },
            'taxPortions': [
                {
                    'rate': 0,
                    'amount': {
                        'currencyCode': 'USD',
                        'centAmount': 0
                    },
                    'name': 'USA'
                }
            ]
        },
        'orderState': 'Open',
        'syncInfo': [],
        'returnInfo': [],
        'taxMode': 'Platform',
        'inventoryMode': 'None',
        'taxRoundingMode': 'HalfEven',
        'lineItems': [
            {
                'id': '31001843-0b72-412f-b1c6-6ca7956807cb',
                'productId': '90ed1673-4553-47c6-9336-5cb23947abb2',
                'name': {
                    'en': 'Expedition Tech Long-Sleeved Shirt'
                },
                'productType': {
                    'typeId': 'product-type',
                    'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4'
                },
                'productSlug': {
                    'en': 'mehiwiext'
                },
                'variant': {
                    'id': 1,
                    'sku': 'mehiwiext-s',
                    'prices': [
                        {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 5400
                            },
                            'id': '8eb69fa9-a292-407c-af3a-19938853981a'
                        }
                    ],
                    'images': [
                        {
                            'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/mehiwiext-s-PeVwTNLc.jpg',
                            'dimensions': {
                                'w': 720,
                                'h': 1080
                            }
                        }
                    ],
                    'attributes': [
                        {
                            'name': 'size',
                            'value': {
                                'en': 'S'
                            }
                        },
                        {
                            'name': 'summary',
                            'value': {
                                'en': 'High tech fabric means you can stay comfortable wherever you go, from the desert to the tropics to alpine terrain.'
                            }
                        },
                        {
                            'name': 'features',
                            'value': {
                                'en': '<ul><li>Lightweight nylon fabric wicks moisture, dries quickly and breathes easily for great comfort\r\n<\\/li><li>Integrated mesh ventilation at the back yoke and under the arms helps keep you cool while traveling in warm climates\r\n<\\/li><li>Cargo-style chest pockets provide ample space for travel essentials\r\n<\\/li><li>Button-close chest pockets keep small items secure<\\/li><\\/ul>'
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
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            'f185f369-4d11-4468-989e-5b3e4650e025': {
                                'isOnStock': true,
                                'availableQuantity': 253
                            },
                            'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                'isOnStock': true,
                                'availableQuantity': 364
                            },
                            '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                'isOnStock': true,
                                'availableQuantity': 10
                            },
                            '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                'isOnStock': true,
                                'availableQuantity': 2
                            },
                            'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                'isOnStock': true,
                                'availableQuantity': 5
                            },
                            '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                'isOnStock': true,
                                'availableQuantity': 2
                            },
                            'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                'isOnStock': true,
                                'availableQuantity': 719
                            },
                            '7119e21a-9835-4056-8312-040e1c0ac704': {
                                'isOnStock': true,
                                'availableQuantity': 595
                            },
                            '2af67970-68a9-45f8-ad11-396abe747631': {
                                'isOnStock': false,
                                'availableQuantity': 0
                            },
                            'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                                'isOnStock': true,
                                'availableQuantity': 1
                            },
                            '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                                'isOnStock': true,
                                'availableQuantity': 613
                            },
                            'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                'isOnStock': true,
                                'availableQuantity': 5
                            },
                            'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                'isOnStock': true,
                                'availableQuantity': 813
                            },
                            'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                'isOnStock': true,
                                'availableQuantity': 407
                            },
                            'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                'isOnStock': true,
                                'availableQuantity': 1
                            }
                        }
                    }
                },
                'price': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 5400
                    },
                    'id': '8eb69fa9-a292-407c-af3a-19938853981a'
                },
                'quantity': 3,
                'discountedPrice': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 5067
                    },
                    'includedDiscounts': [
                        {
                            'discount': {
                                'typeId': 'cart-discount',
                                'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                            },
                            'discountedAmount': {
                                'currencyCode': 'USD',
                                'centAmount': 333
                            }
                        }
                    ]
                },
                'discountedPricePerQuantity': [
                    {
                        'quantity': 2,
                        'discountedPrice': {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 5067
                            },
                            'includedDiscounts': [
                                {
                                    'discount': {
                                        'typeId': 'cart-discount',
                                        'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                                    },
                                    'discountedAmount': {
                                        'currencyCode': 'USD',
                                        'centAmount': 333
                                    }
                                }
                            ]
                        }
                    },
                    {
                        'quantity': 1,
                        'discountedPrice': {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 5066
                            },
                            'includedDiscounts': [
                                {
                                    'discount': {
                                        'typeId': 'cart-discount',
                                        'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                                    },
                                    'discountedAmount': {
                                        'currencyCode': 'USD',
                                        'centAmount': 334
                                    }
                                }
                            ]
                        }
                    }
                ],
                'taxRate': {
                    'name': 'USA',
                    'amount': 0,
                    'includedInPrice': true,
                    'country': 'US',
                    'id': 'UIR0NDyj',
                    'subRates': []
                },
                'state': [
                    {
                        'quantity': 3,
                        'state': {
                            'typeId': 'state',
                            'id': '56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b'
                        }
                    }
                ],
                'priceMode': 'Platform',
                'totalPrice': {
                    'currencyCode': 'USD',
                    'centAmount': 15200
                },
                'taxedPrice': {
                    'totalNet': {
                        'currencyCode': 'USD',
                        'centAmount': 15200
                    },
                    'totalGross': {
                        'currencyCode': 'USD',
                        'centAmount': 15200
                    }
                },
                'lineItemMode': 'Standard'
            }
        ],
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
        'customLineItems': [],
        'transactionFee': true,
        'discountCodes': [],
        'lastMessageSequenceNumber': 1,
        'cart': {
            'typeId': 'cart',
            'id': 'f20b83d4-7001-496f-92eb-b55f2c439761',
            'obj': {
                'type': 'Cart',
                'id': 'f20b83d4-7001-496f-92eb-b55f2c439761',
                'version': 7,
                'createdAt': '2017-09-27T13:31:45.056Z',
                'lastModifiedAt': '2017-09-27T13:32:20.569Z',
                'lineItems': [
                    {
                        'id': '31001843-0b72-412f-b1c6-6ca7956807cb',
                        'productId': '90ed1673-4553-47c6-9336-5cb23947abb2',
                        'name': {
                            'en': 'Expedition Tech Long-Sleeved Shirt'
                        },
                        'productType': {
                            'typeId': 'product-type',
                            'id': '87238665-3388-4cf7-8a3f-bc3dd63724f4',
                            'version': 13
                        },
                        'variant': {
                            'id': 1,
                            'sku': 'mehiwiext-s',
                            'prices': [
                                {
                                    'value': {
                                        'currencyCode': 'USD',
                                        'centAmount': 5400
                                    },
                                    'id': '8eb69fa9-a292-407c-af3a-19938853981a'
                                }
                            ],
                            'images': [
                                {
                                    'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/mehiwiext-s-PeVwTNLc.jpg',
                                    'dimensions': {
                                        'w': 720,
                                        'h': 1080
                                    }
                                }
                            ],
                            'attributes': [
                                {
                                    'name': 'size',
                                    'value': {
                                        'en': 'S'
                                    }
                                },
                                {
                                    'name': 'summary',
                                    'value': {
                                        'en': 'High tech fabric means you can stay comfortable wherever you go, from the desert to the tropics to alpine terrain.'
                                    }
                                },
                                {
                                    'name': 'features',
                                    'value': {
                                        'en': '<ul><li>Lightweight nylon fabric wicks moisture, dries quickly and breathes easily for great comfort\r\n<\\/li><li>Integrated mesh ventilation at the back yoke and under the arms helps keep you cool while traveling in warm climates\r\n<\\/li><li>Cargo-style chest pockets provide ample space for travel essentials\r\n<\\/li><li>Button-close chest pockets keep small items secure<\\/li><\\/ul>'
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
                                        'isOnStock': false,
                                        'availableQuantity': 0
                                    },
                                    'f185f369-4d11-4468-989e-5b3e4650e025': {
                                        'isOnStock': true,
                                        'availableQuantity': 253
                                    },
                                    'd7cb1353-d035-41fc-8f3e-815a90be79fe': {
                                        'isOnStock': true,
                                        'availableQuantity': 364
                                    },
                                    '798b72b4-9aa7-490d-8165-b95a0ee693c2': {
                                        'isOnStock': true,
                                        'availableQuantity': 10
                                    },
                                    '5e39ab7b-ea04-449d-9e52-6867bc5089f0': {
                                        'isOnStock': true,
                                        'availableQuantity': 2
                                    },
                                    'ac94868f-834c-4739-ae7b-e0de610e3740': {
                                        'isOnStock': true,
                                        'availableQuantity': 5
                                    },
                                    '9dc54b43-5f57-4447-9cc4-f13a92a960a3': {
                                        'isOnStock': false,
                                        'availableQuantity': 0
                                    },
                                    '5ffe693e-b711-4168-8a87-4e765ef574b6': {
                                        'isOnStock': true,
                                        'availableQuantity': 2
                                    },
                                    'a400d318-8706-4f5c-adec-d199633c7bf3': {
                                        'isOnStock': true,
                                        'availableQuantity': 719
                                    },
                                    '7119e21a-9835-4056-8312-040e1c0ac704': {
                                        'isOnStock': true,
                                        'availableQuantity': 595
                                    },
                                    '2af67970-68a9-45f8-ad11-396abe747631': {
                                        'isOnStock': false,
                                        'availableQuantity': 0
                                    },
                                    'c53e02ea-2471-4633-8fb7-92be48df0b9d': {
                                        'isOnStock': true,
                                        'availableQuantity': 1
                                    },
                                    '9fc3b5c8-09a5-41e0-85c0-66353a981f1b': {
                                        'isOnStock': true,
                                        'availableQuantity': 613
                                    },
                                    'c3242ee4-edbe-4e52-9a06-55e7048775b3': {
                                        'isOnStock': true,
                                        'availableQuantity': 5
                                    },
                                    'c7f7804b-ed5d-411b-991e-ee069509209b': {
                                        'isOnStock': true,
                                        'availableQuantity': 813
                                    },
                                    'd130804f-6a87-44d8-b401-351152a4b3ff': {
                                        'isOnStock': true,
                                        'availableQuantity': 407
                                    },
                                    'cceec9d0-6b7a-41a2-a9b2-cd5d068187d9': {
                                        'isOnStock': true,
                                        'availableQuantity': 1
                                    }
                                }
                            }
                        },
                        'price': {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 5400
                            },
                            'id': '8eb69fa9-a292-407c-af3a-19938853981a'
                        },
                        'quantity': 3,
                        'discountedPrice': {
                            'value': {
                                'currencyCode': 'USD',
                                'centAmount': 5067
                            },
                            'includedDiscounts': [
                                {
                                    'discount': {
                                        'typeId': 'cart-discount',
                                        'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                                    },
                                    'discountedAmount': {
                                        'currencyCode': 'USD',
                                        'centAmount': 333
                                    }
                                }
                            ]
                        },
                        'discountedPricePerQuantity': [
                            {
                                'quantity': 2,
                                'discountedPrice': {
                                    'value': {
                                        'currencyCode': 'USD',
                                        'centAmount': 5067
                                    },
                                    'includedDiscounts': [
                                        {
                                            'discount': {
                                                'typeId': 'cart-discount',
                                                'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                                            },
                                            'discountedAmount': {
                                                'currencyCode': 'USD',
                                                'centAmount': 333
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                'quantity': 1,
                                'discountedPrice': {
                                    'value': {
                                        'currencyCode': 'USD',
                                        'centAmount': 5066
                                    },
                                    'includedDiscounts': [
                                        {
                                            'discount': {
                                                'typeId': 'cart-discount',
                                                'id': '80ac44bd-bcb9-414f-afb7-fe48207a2834'
                                            },
                                            'discountedAmount': {
                                                'currencyCode': 'USD',
                                                'centAmount': 334
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        'taxRate': {
                            'name': 'USA',
                            'amount': 0,
                            'includedInPrice': true,
                            'country': 'US',
                            'id': 'UIR0NDyj',
                            'subRates': []
                        },
                        'state': [
                            {
                                'quantity': 3,
                                'state': {
                                    'typeId': 'state',
                                    'id': '56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b'
                                }
                            }
                        ],
                        'priceMode': 'Platform',
                        'totalPrice': {
                            'currencyCode': 'USD',
                            'centAmount': 15200
                        },
                        'taxedPrice': {
                            'totalNet': {
                                'currencyCode': 'USD',
                                'centAmount': 15200
                            },
                            'totalGross': {
                                'currencyCode': 'USD',
                                'centAmount': 15200
                            }
                        },
                        'lineItemMode': 'Standard'
                    }
                ],
                'cartState': 'Ordered',
                'totalPrice': {
                    'currencyCode': 'USD',
                    'centAmount': 15200
                },
                'taxedPrice': {
                    'totalNet': {
                        'currencyCode': 'USD',
                        'centAmount': 15200
                    },
                    'totalGross': {
                        'currencyCode': 'USD',
                        'centAmount': 15200
                    },
                    'taxPortions': [
                        {
                            'rate': 0,
                            'amount': {
                                'currencyCode': 'USD',
                                'centAmount': 0
                            },
                            'name': 'USA'
                        }
                    ]
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
                'customLineItems': [],
                'discountCodes': [],
                'inventoryMode': 'None',
                'taxMode': 'Platform',
                'taxRoundingMode': 'HalfEven',
                'refusedGifts': []
            }
        }
    },
    'statusCode': 201
};
