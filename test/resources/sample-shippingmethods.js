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
        "offset": 0,
        "count": 5,
        "total": 5,
        "results": [
            {
                "id": "38630bb7-886b-4255-ba22-cb7d8c14e695",
                "version": 4,
                "name": "DE",
                "description": "",
                "taxCategory": {
                    "typeId": "tax-category",
                    "id": "7605345a-c739-4708-b041-bd81f732bfe4"
                },
                "zoneRates": [
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "779f299c-4175-417c-b9a9-ef89accfe770"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 1000
                                },
                                "tiers": []
                            }
                        ]
                    }
                ],
                "isDefault": false,
                "createdAt": "2017-08-18T15:33:58.293Z",
                "lastModifiedAt": "2017-09-06T11:58:47.225Z"
            },
            {
                "id": "1c08105c-a4ad-49ba-beb2-76e7d91190d7",
                "version": 13,
                "name": "one-business-day",
                "description": "Flat Rate 1-day Shipping",
                "taxCategory": {
                    "typeId": "tax-category",
                    "id": "389581cc-f8dc-438c-afed-bb63f3b9da91"
                },
                "zoneRates": [
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "b223d609-e2c1-4135-a888-74d6fae5971e"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 4000
                                },
                                "tiers": []
                            }
                        ]
                    },
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "779f299c-4175-417c-b9a9-ef89accfe770"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 1000
                                },
                                "tiers": []
                            }
                        ]
                    }
                ],
                "isDefault": false,
                "createdAt": "2016-10-27T15:12:09.370Z",
                "lastModifiedAt": "2017-09-06T12:44:11.063Z"
            },
            {
                "id": "6f0b3638-73a5-4d80-8455-081d3e9f98bb",
                "version": 13,
                "name": "two-business-day",
                "description": "Flat Rate 2-day Shipping",
                "taxCategory": {
                    "typeId": "tax-category",
                    "id": "389581cc-f8dc-438c-afed-bb63f3b9da91"
                },
                "zoneRates": [
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "b223d609-e2c1-4135-a888-74d6fae5971e"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 2500
                                },
                                "freeAbove": {
                                    "currencyCode": "USD",
                                    "centAmount": 10000
                                },
                                "tiers": []
                            }
                        ]
                    },
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "779f299c-4175-417c-b9a9-ef89accfe770"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 2500
                                },
                                "tiers": []
                            }
                        ]
                    }
                ],
                "isDefault": true,
                "createdAt": "2016-10-27T15:12:49.940Z",
                "lastModifiedAt": "2017-09-06T12:44:11.078Z"
            },
            {
                "id": "778fe3f4-5692-4fcb-99ae-57de738f79e7",
                "version": 8,
                "name": "standard-shipping",
                "description": "Standard Shipping: 5-14 business days",
                "taxCategory": {
                    "typeId": "tax-category",
                    "id": "389581cc-f8dc-438c-afed-bb63f3b9da91"
                },
                "zoneRates": [
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "b223d609-e2c1-4135-a888-74d6fae5971e"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 2000
                                },
                                "tiers": []
                            }
                        ]
                    },
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "779f299c-4175-417c-b9a9-ef89accfe770"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 2000
                                },
                                "tiers": []
                            }
                        ]
                    }
                ],
                "isDefault": false,
                "createdAt": "2016-10-27T15:13:15.271Z",
                "lastModifiedAt": "2017-08-18T15:37:19.853Z"
            },
            {
                "id": "34e79a6b-13f0-45ba-989e-dfabe3230d07",
                "version": 9,
                "name": "ground-shipping",
                "description": "Ground Shipping: 3-7 business days",
                "taxCategory": {
                    "typeId": "tax-category",
                    "id": "389581cc-f8dc-438c-afed-bb63f3b9da91"
                },
                "zoneRates": [
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "b223d609-e2c1-4135-a888-74d6fae5971e"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 1000
                                },
                                "tiers": []
                            }
                        ]
                    },
                    {
                        "zone": {
                            "typeId": "zone",
                            "id": "779f299c-4175-417c-b9a9-ef89accfe770"
                        },
                        "shippingRates": [
                            {
                                "price": {
                                    "currencyCode": "USD",
                                    "centAmount": 1000
                                },
                                "tiers": []
                            }
                        ]
                    }
                ],
                "isDefault": false,
                "createdAt": "2016-10-27T15:13:38.765Z",
                "lastModifiedAt": "2017-08-18T15:37:31.905Z"
            }
        ]
    },
    'statusCode': 200
};