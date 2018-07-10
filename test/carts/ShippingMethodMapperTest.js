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

const assert = require('chai').assert;
const sampleShippingMethodsFile = require('../resources/sample-shippingmethods');
const sampleShippingMethodsForCartFile = require('../resources/sample-shippingmethods-for-cart');
const MissingProperty = require('@adobe/commerce-cif-common').MissingPropertyException;
const utils = require('../lib/utils');

describe('commercetools ShippingMethodMapper', () => {

    let action = utils.getPathForAction(__dirname, 'ShippingMethodMapper');
    let shippingMethodMapper = require(action);

    describe('Unit tests', () => {

        let sampleShippingMethods = null;
        let sampleShippingMethodsForCart = null;

        beforeEach(() => {
            // clone original sample data before each test
            sampleShippingMethods = JSON.parse(JSON.stringify(sampleShippingMethodsFile));
            sampleShippingMethodsForCart = JSON.parse(JSON.stringify(sampleShippingMethodsForCartFile));
        });

        it('shipping methods', () => {
            let mappedShippingMethods = shippingMethodMapper.mapShippingMethods(sampleShippingMethods);
            assert.isDefined(mappedShippingMethods);
            assert.isObject(mappedShippingMethods);
            assert.isDefined(mappedShippingMethods.results);
            assert.isArray(mappedShippingMethods.results);
            assert.lengthOf(mappedShippingMethods.results, sampleShippingMethods.body.results.length);

            mappedShippingMethods.results.forEach(shippingMethod => {
                assert.containsAllKeys(shippingMethod, ['id', 'name', 'description', 'price']);
            });
        });

        it('shipping methods for cart', () => {
            let mappedShippingMethods = shippingMethodMapper.mapShippingMethods(sampleShippingMethodsForCart);
            assert.isDefined(mappedShippingMethods);
            assert.isArray(mappedShippingMethods);
            assert.lengthOf(mappedShippingMethods, sampleShippingMethodsForCart.body.length);

            mappedShippingMethods.forEach(shippingMethod => {
                assert.containsAllKeys(shippingMethod, ['id', 'name', 'description', 'price']);
            });
        });

        it('shipping methods - invalid CT response body', () => {
            delete sampleShippingMethodsForCart.body;
            assert.throws(() => shippingMethodMapper.mapShippingMethods(sampleShippingMethodsForCart),
                          MissingProperty);
        });
    });
});
