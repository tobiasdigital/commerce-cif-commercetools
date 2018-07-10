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

const expect = require('chai').expect;
const utils = require('../lib/utils');
const AssertionError = require('assert').AssertionError;

describe('commercetools CouponMapper', () => {

    let action = utils.getPathForAction(__dirname, 'CouponMapper');
    let CouponMapper = require(action);

    describe('Unit tests', () => {

        it('should return a Coupon instance', () => {
            let ctCoupon = {
                "id": "coupon-id",
                "code": "APRIL18",
                "name": {
                    "de": "CCIF Discount"
                },
                "description": {
                    "de": "This is a sample description"
                }
            };
        
            let expectedCoupon = {
                id: 'coupon-id',
                code: 'APRIL18',
                description: {
                    de: 'This is a sample description'
                }
            };

            let cifCoupon = CouponMapper.mapCoupon(ctCoupon);
            expect(cifCoupon).to.deep.equal(expectedCoupon);
        });

        it('should return a Coupon instance without a description', () => {
            let ctCoupon = {
                "id": "coupon-id",
                "code": "APRIL18"
            };
        
            let expectedCoupon = {
                id: 'coupon-id',
                code: 'APRIL18',
                description: {}
            };

            let cifCoupon = CouponMapper.mapCoupon(ctCoupon);
            expect(cifCoupon).to.deep.equal(expectedCoupon);
        })

        it('should return an error if the coupon id is not set', () => {
            let ctCoupon = {
                "code": "APRIL18"
            };
            expect(() => { CouponMapper.mapCoupon(ctCoupon); }).to.throw(AssertionError, /Coupon id is not set./);
        });

        it('should return an error if the coupon code is not set', () => {
            let ctCoupon = {
                "id": "coupon-id"
            };
            expect(() => { CouponMapper.mapCoupon(ctCoupon); }).to.throw(AssertionError, /Coupon code is not set./);
        });

    });
});
