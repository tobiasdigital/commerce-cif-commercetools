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

const setup = require('../lib/setupIT.js').setup;
const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const expect = chai.expect;
const requiredFields = require('../lib/requiredFields');
const extractToken = require('../lib/setupIT').extractToken;
const OAUTH_TOKEN_NAME = require('../../src/common/constants').OAUTH_TOKEN_NAME;
chai.use(chaiHttp);

/**
 * @param ctx           context initialized by action describe
 * @param addressType   string identifying a cart address. Can be shipping or billing.
 * @return that         an object that encapsulates test functions for both post and delete http operations.
 */
module.exports.tests = function (ctx, addressType) {

    let that = {};
    // Get environment
    let env = setup();

    //initialize posted URI paths.
    that.deleteAddressPath = env.cartsPackage + 'deleteShippingAddress';
    that.postAddressPath = env.cartsPackage + 'postShippingAddress';
    that.addressPropertyName = 'shippingAddress';

    if (typeof addressType !== 'undefined' && addressType === 'billing') {
        that.deleteAddressPath = env.cartsPackage + 'deleteBillingAddress';
        that.postAddressPath = env.cartsPackage + 'postBillingAddress';
        that.addressPropertyName = 'billingAddress';
    }

    // Increase test timeout
    ctx.slow(env.slow);
    ctx.timeout(env.timeout);

    let cartId;
    let accessToken;

    /** Create empty cart - same for all address ITs */
    beforeEach(function () {
        return chai.request(env.openwhiskEndpoint)
            .post(env.cartsPackage + 'postCartEntry')
            .query({currency: 'USD'})
            .set('Accept-Language', 'en-US')
            .then(function (res) {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatus.CREATED);
                // Store cart id
                cartId = res.body.id;
                // Store token to access the anonymous session
                accessToken = extractToken(res);
            })
            .catch(function (err) {
                throw err;
            });
    });
    /**
     * Verifies that a bad request is returned when no cart id is provided. Used only from post and deletes address ITs.
     *
     * @param path  post URI path. Passed as parameter to be reused from any address IT (post or delete).
     */
    that.missingCart = function (path) {
        return chai.request(env.openwhiskEndpoint)
            .post(path)
            .query({})
            .catch(function (err) {
                expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                expect(err.response).to.be.json;
                requiredFields.verifyErrorResponse(err.response.body);
            });
    };
    /**
     * Verifies that a not found is returned when the cart id does not exists. Used only from post and deletes
     * address ITs.
     *
     * @param path  post URI path. Passed as parameter to be reused from any address IT (post or delete).
     */
    that.nonExistingCart = function (path) {
        return chai.request(env.openwhiskEndpoint)
            .post(path)
            .query({id: 'non-existing-cart-id'})
            .set('Accept-Language', 'en-US')
            .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
            .catch(function (err) {
                expect(err.response).to.have.status(HttpStatus.NOT_FOUND);
                expect(err.response).to.be.json;
                requiredFields.verifyErrorResponse(err.response.body);
            });
    };
    /**
     * Verifies that a bad request is returned when country is empty. Used only from post address ITs.
     */
    that.postAddressWithNoCountry = function () {
        return chai.request(env.openwhiskEndpoint)
            .post(that.postAddressPath)
            .query({id: cartId, title: 'Home'})
            .set('Accept-Language', 'en-US')
            .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
            .catch(function (err) {
                expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                expect(err.response).to.be.json;
                requiredFields.verifyErrorResponse(err.response.body);
            });
    };

    /**
     * Verifies that an address is correctly created. Used only from post address ITs.
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
            id: cartId
        };

        return chai.request(env.openwhiskEndpoint)
            .post(that.postAddressPath)
            .query(args)
            .send({
                address: addr
            })
            .set('Accept-Language', 'en-US')
            .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
            .then(function (res) {
                let addressBodyPropertyName = res.body[that.addressPropertyName];
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.body).to.have.property(that.addressPropertyName);
                requiredFields.verifyAddress(addressBodyPropertyName);
                expect(addressBodyPropertyName).to.have.property('title');
                expect(addressBodyPropertyName.title).to.equal(addr.title);
                expect(addressBodyPropertyName).to.have.property('salutation');
                expect(addressBodyPropertyName.salutation).to.equal(addr.salutation);
                expect(addressBodyPropertyName.firstName).to.equal(addr.firstName);
                expect(addressBodyPropertyName.lastName).to.equal(addr.lastName);
                expect(addressBodyPropertyName.streetName).to.equal(addr.streetName);
                expect(addressBodyPropertyName).to.have.property('streetNumber');
                expect(addressBodyPropertyName.streetNumber).to.equal(addr.streetNumber);
                expect(addressBodyPropertyName).to.have.property('additionalStreetInfo');
                expect(addressBodyPropertyName.additionalStreetInfo).to.equal(addr.additionalStreetInfo);
                expect(addressBodyPropertyName.postalCode).to.equal(addr.postalCode);
                expect(addressBodyPropertyName.city).to.equal(addr.city);
                expect(addressBodyPropertyName).to.have.property('region');
                expect(addressBodyPropertyName.region).to.equal(addr.region);
                expect(addressBodyPropertyName.country).to.equal(addr.country);
                expect(addressBodyPropertyName).to.have.property('organizationName');
                expect(addressBodyPropertyName.organizationName).to.equal(addr.organizationName);
                expect(addressBodyPropertyName).to.have.property('department');
                expect(addressBodyPropertyName.department).to.equal(addr.department);
                expect(addressBodyPropertyName).to.have.property('phone');
                expect(addressBodyPropertyName.phone).to.equal(addr.phone);
                expect(addressBodyPropertyName).to.have.property('mobile');
                expect(addressBodyPropertyName.mobile).to.equal(addr.mobile);
                expect(addressBodyPropertyName).to.have.property('email');
                expect(addressBodyPropertyName.email).to.equal(addr.email);
                expect(addressBodyPropertyName).to.have.property('fax');
                expect(addressBodyPropertyName.fax).to.equal(addr.fax);
                expect(addressBodyPropertyName).to.have.property('additionalAddressInfo');
                expect(addressBodyPropertyName.additionalAddressInfo).to.equal(addr.additionalAddressInfo);
                
                if (that.addressPropertyName === 'shippingAddress') {
                    expect(res.body).to.have.property('netTotalPrice');
                    expect(res.body).to.have.property('grossTotalPrice');
                }
            });
    };

    /**
     * Verifies that an address is correctly deleted. Used only from delete address ITs.
     */
    that.deleteAddressSuccess = function () {
        const args = {
            id: cartId
        };
        return chai
            .request(env.openwhiskEndpoint)
            .post(that.postAddressPath)
            .query(args)
            .send({
                address: {
                    title: 'Work',
                    country: 'US'
                }
            })
            .set('Accept-Language', 'en-US')
            .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`)
            .then(function (res) {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.body).to.have.property(that.addressPropertyName);

                return chai.request(env.openwhiskEndpoint)
                    .post(that.deleteAddressPath)
                    .query({id: cartId})
                    .set('Accept-Language', 'en-US')
                    .set('cookie', `${OAUTH_TOKEN_NAME}=${accessToken};`);
            }).then(function (res) {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.body).to.not.have.property(that.addressPropertyName);
            });
    };

    return that;
};