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

const Order = require('@adobe/commerce-cif-model').Order;

/**
 * Utility class to map commercetools order objects to CCIF objects.
 */
class OrderMapper {

    /**
     * Maps the CommerceTools order to the CCIF order.
     *
     * @param ctOrder           JSON containing order information as returned by CommerceTools.
     * @returns {Order}         CCIF Order representation.
     */
    static mapOrder(ctOrder) {
        const ccifOrder = new Order();
        if(!ctOrder.body.id) {
            throw new Error("No order id in Commerce Tools response.");
        }
        ccifOrder.id = ctOrder.body.id;
        return ccifOrder;
    }
}

module.exports = OrderMapper;
