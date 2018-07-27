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
const samplecart1 = require('../resources/sample-cart');
const config = require('../lib/config').config;
const CommerceToolsAddressHelper = require('../../src/carts/CommerceToolsAddressHelper');

/**
 * @param ctx           context initialized by action describe
 * @param addressType   string identifying a cart address. Can be shipping or billing.
 * @return that         an object that encapsulates test functions for both post and delete http operations.
 */
module.exports.tests = function (ctx, addressType) {

    let that = {};

    //initialize method and property based on addressType.
    let addressActionMethod = CommerceToolsAddressHelper.SET_SHIPPING_ADDRESS();
    let addressResponseProperty = 'shippingAddress';

    if (typeof addressType !== 'undefined' && addressType === 'billing') {
        addressActionMethod = CommerceToolsAddressHelper.SET_BILLING_ADDRESS();
        addressResponseProperty = 'billingAddress';
    }

    /**
     * Verifies that the correct error is returned when the cart id is not provided. Used from post/delete unit tests.
     */
    that.missingCartId = function () {
        return ctx.execute()
           .then(result => {
               assert.isDefined(result.response);
               assert.isDefined(result.response.error);
               assert.strictEqual(result.response.error.message, 'Parameter \'id\' is missing.');
           });
    };

    /**
     * Verifies that the correct error is returned when the no address field is provided. Used from post/delete unit tests.
     */
    that.emptyAddress = function () {
        return ctx.execute({'id': '12345-1'})
           .then(result => {
               assert.isDefined(result.response);
               assert.isDefined(result.response.error);
               assert.strictEqual(result.response.error.name, 'MissingPropertyError');
           });
    };

    /**
     * Verifies that the an address is correctly created. Used from post unit tests.
     */
    that.postAddressSuccess = function () {
        const addr = {
            title: 'Work',
            salutation: 'Ms',
            firstName: 'Cat Eye',
            lastName: 'Nebulae',
            streetName: 'Draco',
            streetNumber: '3,262',
            additionalStreetInfo: 'Light Years',
            postalCode: '666666',
            city: 'Constellation',
            region: 'FarAway',
            country: 'US',
            organizationName: 'Zeus',
            department: 'Production',
            phone: '66666666666',
            mobile: '66666666666',
            email: 'cat.eye@zeus.com',
            fax: '6666666666',
            additionalAddressInfo: 'Diameter: ~4.5 Light Years, 26,453,814,179,326 Miles'
        };
        const args = {
            id: '12345-7',
            address: addr
        };
        const expectedArgs = [{
            uri: encodeURI(
                `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
            method: 'GET',
            headers: undefined
        }, {
            uri: encodeURI(
                `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
            method: 'POST',
            body: `{"actions":[{"action":"${addressActionMethod}","address":{"title":"${addr.title}","salutation":"${addr.salutation}","firstName":"${addr.firstName}","lastName":"${addr.lastName}","streetName":"${addr.streetName}","streetNumber":"${addr.streetNumber}","additionalStreetInfo":"${addr.additionalStreetInfo}","postalCode":"${addr.postalCode}","city":"${addr.city}","region":"${addr.region}","country":"${addr.country}","department":"${addr.department}","phone":"${addr.phone}","mobile":"${addr.mobile}","email":"${addr.email}","fax":"${addr.fax}","additionalAddressInfo":"${addr.additionalAddressInfo}","company":"${addr.organizationName}"}}],"version":7}`,
            headers: undefined
        }];
        return ctx.prepareResolve(samplecart1, expectedArgs)
                   .execute(args)
                   .then(result => {
                       assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                       assert.isDefined(result.response);
                       assert.strictEqual(result.response.statusCode, 200);
                       assert.isDefined(result.response.body);
                   });
    }
    /**
     * Verifies that the an address is correctly deleted. Used from delete unit tests.
     */
    that.deleteAddressSuccess = function () {
        const args = {
            id: '12345-7'
        };
        const expectedArgs = [{
            uri: encodeURI(
                `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
            method: 'GET',
            headers: undefined
        }, {
            uri: encodeURI(
                `/${config.CT_PROJECTKEY}/me/carts/12345?${config.CART_EXPAND_QS}`),
            method: 'POST',
            body: `{"actions":[{"action":"${addressActionMethod}"}],"version":7}`,
            headers: undefined
        }];

        let sampleCartNoAddress = JSON.parse(JSON.stringify(samplecart1));
        delete sampleCartNoAddress.body[addressResponseProperty];

        return ctx.prepareResolve(sampleCartNoAddress, expectedArgs)
                  .execute(args)
                  .then(result => {
                      assert.isUndefined(result.response.error, JSON.stringify(result.response.error));
                      assert.isDefined(result.response);
                      assert.isDefined(result.response.body);
                      assert.isUndefined(result.response.body[addressResponseProperty],
                                         'Expected undefined result.response.body[addressResponseProperty]');
                  });
    };

    return that;
};
