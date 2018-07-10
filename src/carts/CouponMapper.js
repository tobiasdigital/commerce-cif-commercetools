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

const Coupon = require('@adobe/commerce-cif-model').Coupon;
const assert = require('assert');

/**
 * Utility class to map commercetools coupons to CCIF coupons.
 */
class CouponMapper {
    
    /**
     * Maps a single Commerce Tools coupon to a CCIF coupon.
     * 
     * @param ctCoupon
     * @return {Coupon}
     */
    static mapCoupon(ctCoupon) {

        let cifCoupon = new Coupon();

        assert(ctCoupon.id, "Coupon id is not set.");
        cifCoupon.id = ctCoupon.id;

        assert(ctCoupon.code, "Coupon code is not set.");
        cifCoupon.code = ctCoupon.code;

        if (ctCoupon.description) {
            cifCoupon.description = ctCoupon.description;
        } else {
            cifCoupon.description = {};
        }

        return cifCoupon;
    }
}

module.exports = CouponMapper;