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
const AssertionError = require('assert').AssertionError;
const LanguageParser = require('../../src/common/LanguageParser');
const CouponMapper = require('../../src/carts/CouponMapper');

describe('commercetools CouponMapper', () => {

    describe('Unit tests', () => {

        let args = {
            __ow_headers: {
                'accept-language': 'en-US'
            }
        };
        let languageParser = new LanguageParser(args);
        let couponMapper = new CouponMapper(languageParser);

        it('should return a Coupon instance', () => {
            let ctCoupon = {
                "id": "coupon-id",
                "code": "APRIL18",
                "name": {
                    "en": "CCIF Discount"
                },
                "description": {
                    "en": "This is a sample description"
                }
            };
        
            let expectedCoupon = {
                id: 'coupon-id',
                code: 'APRIL18',
                description: 'This is a sample description'
            };

            let cifCoupon = couponMapper.mapCoupon(ctCoupon);
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
                description: undefined
            };

            let cifCoupon = couponMapper.mapCoupon(ctCoupon);
            expect(cifCoupon).to.deep.equal(expectedCoupon);
        })

        it('should return an error if the coupon id is not set', () => {
            let ctCoupon = {
                "code": "APRIL18"
            };
            expect(() => { couponMapper.mapCoupon(ctCoupon); }).to.throw(AssertionError, /Coupon id is not set./);
        });

        it('should return an error if the coupon code is not set', () => {
            let ctCoupon = {
                "id": "coupon-id"
            };
            expect(() => { couponMapper.mapCoupon(ctCoupon); }).to.throw(AssertionError, /Coupon code is not set./);
        });

    });
});
