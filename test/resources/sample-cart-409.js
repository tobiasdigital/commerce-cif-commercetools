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
    'code': 409,
    'statusCode': 409,
    'status': 409,
    'message': 'Object cb3bf80c-858d-4dcb-8d8c-3c885c050163 has a different version than expected. Expected: 3 - Actual: 44.',
    'originalRequest': {
        'uri': '/aem-weretail-demo/carts/cb3bf80c-858d-4dcb-8d8c-3c885c050163?expand=lineItems%5B*%5D.productType&expand=lineItems%5B*%5D.discountedPricePerQuantity%5B*%5D.discountedPrice.includedDiscounts%5B*%5D.discount&expand=shippingInfo.discountedPrice.includedDiscounts%5B*%5D.discount&expand=paymentInfo.payments%5B*%5D',
        'headers': {
            'Authorization': 'Bearer poBK7449pjw-kN6L5dXlq0T2EYMRx1W6'
        },
        'method': 'POST',
        'body': '{"actions":[{"action":"addLineItem","productId":"526dc571-104f-40fb-b761-71781a97910b","variantId":1,"quantity":1}],"version":3}'
    },
    'headers': {
        'server': [
            'nginx'
        ],
        'date': [
            'Tue, 24 Oct 2017 13:29:02 GMT'
        ],
        'content-type': [
            'application/json; charset=utf-8'
        ],
        'content-length': [
            '325'
        ],
        'x-correlation-id': [
            'projects-4163bfa3-7c14-413c-8d50-b03863940bc2'
        ],
        'x-served-by': [
            'api-gce-2b565943.dfw.commercetools.co'
        ],
        'x-served-config': [
            'sphere-projects-ws-1.0'
        ],
        'access-control-allow-origin': [
            '*'
        ],
        'access-control-allow-headers': [
            'Accept, Authorization, Content-Type, Origin, User-Agent'
        ],
        'access-control-allow-methods': [
            'GET, POST, DELETE, OPTIONS'
        ],
        'access-control-max-age': [
            '299'
        ],
        'via': [
            '1.1 google'
        ],
        'alt-svc': [
            'clear'
        ],
        'connection': [
            'close'
        ]
    },
    'body': {
        'statusCode': 409,
        'message': 'Object cb3bf80c-858d-4dcb-8d8c-3c885c050163 has a different version than expected. Expected: 3 - Actual: 44.',
        'errors': [
            {
                'code': 'ConcurrentModification',
                'message': 'Object cb3bf80c-858d-4dcb-8d8c-3c885c050163 has a different version than expected. Expected: 3 - Actual: 44.',
                'currentVersion': 44
            }
        ]
    },
    'name': 'ConcurrentModification'
};

