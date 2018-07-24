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

const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const setup = require('../lib/setupIT.js').setup;

const expect = chai.expect;

chai.use(chaiHttp);


describe('commercetools postShippingMethod', function () {

    describe('Integration tests', function () {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        let cartId;
        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';
        /** Create empty cart. */
        beforeEach(function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postCartEntry')
                .query({
                    currency: 'USD',
                    quantity: 5,
                    productVariantId: productVariantId
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.CREATED);

                    // Store cart id
                    cartId = res.body.id;
                })
                .catch(function (err) {
                    throw err;
                });
        });

        /** Delete cart. */
        after(function () {
            // TODO(mabecker): Delete cart with id = cartId
        });

        it('returns 400 for updating the shipping method of non existing cart', function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postShippingMethod')
                .query({
                    id: 'non-existing-cart-id',
                    shippingMethodId: 666
                })
                .set('Accept-Language', 'en-US')
                .catch(function (err) {
                    expect(err.response).to.have.status(HttpStatus.NOT_FOUND);
                });
        });

        it('returns 400 for updating the shipping method with no parameters', function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postShippingMethod')
                .query({
                    id: cartId
                })
                .set('Accept-Language', 'en-US')
                .catch(function (err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

        it('sets shipping method', function () {
            const args = {
                id: cartId,
                shippingMethodId: '6f0b3638-73a5-4d80-8455-081d3e9f98bb'
            };

            //set a shipping address
            return chai.request(env.openwhiskEndpoint)
                .post(env.cartsPackage + 'postShippingAddress')
                .query({
                    id: cartId,
                })
                .send({
                    address: {country: 'US'}
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    return chai.request(env.openwhiskEndpoint)
                    .post(env.cartsPackage + 'postShippingMethod')
                    .query(args)
                    .set('Accept-Language', 'en-US');
                })
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body).to.have.property('shippingInfo');
                    expect(res.body.shippingInfo).to.have.property('id');
                    expect(res.body.shippingInfo).to.have.property('name');
                    expect(res.body.shippingInfo).to.have.property('price');
                });

        });

    });
});