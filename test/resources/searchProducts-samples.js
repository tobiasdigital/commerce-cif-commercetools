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

const allFieldsQueryResult = {
    "data": {
        "searchProducts": {
            "offset": 0,
            "count": 1,
            "total": 1,
            "results": [
                {
                    "name": "Midweight Fleece Gloves",
                    "sku": "meskwimis",
                    "assets": [],
                    "masterVariantId": "89cf05ea-d3b0-4dde-9ae7-e6b3140b9c23-1",
                    "prices": [],
                    "description": "gloves",
                    "attributes": [],
                    "id": "89cf05ea-d3b0-4dde-9ae7-e6b3140b9c23",
                    "categories": [
                        {
                            "id": "71db6fed-2c2e-43b8-9b2a-afbcaa435889"
                        }
                    ],
                    "createdAt": "2017-01-11T14:58:29.251Z",
                    "lastModifiedAt": "2017-12-11T21:00:46.991Z",
                    "variants": [
                        {
                            "name": "Midweight Fleece Gloves",
                            "sku": "meskwimis-one size",
                            "assets": [
                                {
                                    "url": "https://59ecc1f6a208f42ebe11-ba27c79b8e149374ce80790cf798d65a.ssl.cf1.rackcdn.com/meskwimis-one+size--1JH2T7b.jpg"
                                }
                            ],
                            "prices": [
                                {
                                    "currency": "USD",
                                    "country": null,
                                    "amount": 3000
                                }
                            ],
                            "description": "gloves",
                            "attributes": [],
                            "id": "89cf05ea-d3b0-4dde-9ae7-e6b3140b9c23-1",
                            "categories": [],
                            "createdAt": null,
                            "available": true,
                            "lastModifiedAt": null
                        }
                    ]
                }
            ]
        }
    }
};

module.exports = { allFieldsQueryResult };