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
const sampleorder = require('../resources/sample-order');
const utils = require('../lib/utils');
const OrderMapper = require('../../src/orders/OrderMapper');

describe('commercetools OrderMapper', () => {

    describe('Unit tests', () => {
        let orderData = null;
        let orderMapper = new OrderMapper();

        beforeEach(() => {
            // clone original sample data before each test
            orderData = utils.clone(sampleorder);
        });

        it('order - success', () => {
            let mappedOrder = orderMapper.mapOrder(orderData);
            assert.isDefined(mappedOrder);
            assert.isDefined(mappedOrder.id);
            assert.strictEqual(orderData.body.id,mappedOrder.id);
        });

        it('order - error missing order id', () => {
            let orderDataNoId = utils.clone(orderData);
            delete orderDataNoId.body.id;
            assert.throws(() => orderMapper.mapOrder(orderDataNoId), Error);
        });


    });
});
