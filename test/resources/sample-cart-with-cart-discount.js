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
        'id': '421f53a4-5e88-424f-8cf2-90885c753b02',
        'version': 5,
        'createdAt': '2017-08-21T12:21:37.391Z',
        'lastModifiedAt': '2017-08-21T12:23:05.434Z',
        'lineItems': [{
            'id': 'c09d2adf-cea7-4a51-ae35-40e6d205f264',
            'productId': 'f5a613b9-2ee5-4112-b356-253d3a0a134d',
            'name': {'en': 'Manta Ray Snorkel and Dive Mask'},
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
            'productSlug': {'en': 'eqswsumak'},
            'variant': {
                'id': 1,
                'sku': 'eqswsumak-one size',
                'prices': [{
                    'value': {'currencyCode': 'USD', 'centAmount': 5000},
                    'id': '66236b07-63b7-4154-8a14-ed6c3e624835'
                }],
                'images': [{
                    'url': 'https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/eqswsumak-one+size-6dglKpWN.jpg',
                    'dimensions': {'w': 718, 'h': 1080}
                }],
                'attributes': [{'name': 'size', 'value': {'en': 'One size'}}, {
                    'name': 'summary',
                    'value': {'en': 'The Manta Ray Dive Mask and Snorkel combo brings you into crystal-clear contact with the world below the water\'s surface.'}
                }, {
                    'name': 'features',
                    'value': {'en': 'Mask features beveled sides that provide a wide field of vision and an adjustable head strap with soft-touch, quick-release buckles\r\nSilicone face skirt forms a tight seal with your face and helps keep water out\r\nSnorkel features a silicone mouthpiece that fits comfortably in your mouth\r\nA shaped top prevents waves from entering snorkel from the front, back and sides, ensuring you won\'t be surprised by inhaling an errant wave'}
                }],
                'assets': []
            },
            'price': {
                'value': {'currencyCode': 'USD', 'centAmount': 5000},
                'id': '66236b07-63b7-4154-8a14-ed6c3e624835'
            },
            'quantity': 3,
            'discountedPricePerQuantity': [{
                'quantity': 3,
                'discountedPrice': {
                    'value': {
                        'currencyCode': 'USD',
                        'centAmount': 4000
                    },
                    'includedDiscounts': [
                        {
                            'discount': {
                                'typeId': 'cart-discount',
                                'id': 'c9d7c64f-338e-4959-97f0-2f5f16a166db',
                                'obj': {
                                    'id': 'c9d7c64f-338e-4959-97f0-2f5f16a166db',
                                    'version': 2,
                                    'value': {'type': 'relative', 'permyriad': 2000},
                                    'cartPredicate': 'lineItemCount(categories.id contains "28fa988e-2b6e-4925-a2e7-f7b6c562af97") > 1',
                                    'target': {
                                        'type': 'lineItems',
                                        'predicate': 'categories.id contains "28fa988e-2b6e-4925-a2e7-f7b6c562af97"'
                                    },
                                    'name': {
                                        'en': '20% discount on all equipment items if buy at least 2',
                                        'de': '20% Rabatt auf alle Ausrüstungsgegenstände bei Kauf mindestens 2'
                                    },
                                    'description': {
                                        'en': 'Some description',
                                        'de': 'Some description DE'
                                    },
                                    'isActive': true,
                                    'requiresDiscountCode': false,
                                    'sortOrder': '0.81',
                                    'references': [{'typeId': 'category', 'id': '28fa988e-2b6e-4925-a2e7-f7b6c562af97'}],
                                    'attributeTypes': {},
                                    'cartFieldTypes': {},
                                    'lineItemFieldTypes': {},
                                    'customLineItemFieldTypes': {},
                                    'createdAt': '2017-08-21T12:20:19.000Z',
                                    'lastModifiedAt': '2017-08-21T12:20:38.281Z'
                                }
                            },
                            'discountedAmount': {
                                'currencyCode': 'USD',
                                'centAmount': 1000
                            }
                        }
                    ]
                }
            }],
            'state': [{'quantity': 3, 'state': {'typeId': 'state', 'id': '56e282a3-4a2d-49fd-85ea-2b1eaa6bd38b'}}],
            'priceMode': 'Platform',
            'totalPrice': {'currencyCode': 'USD', 'centAmount': 12000},
            'lineItemMode': 'Standard'
        }],
        'cartState': 'Active',
        'totalPrice': {'currencyCode': 'USD', 'centAmount': 12000},
        'customLineItems': [],
        'discountCodes': [],
        'inventoryMode': 'None',
        'taxMode': 'Platform',
        'taxRoundingMode': 'HalfEven',
        'refusedGifts': []
    }
};