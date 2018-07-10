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


describe('commercetools deleteShippingMethod', function () {

    describe('Integration tests', function () {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        let cartId;

        /** Create empty cart. */
        beforeEach(function () {
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postCartEntry')
                       .query({
                                  currency: 'USD'
                              })
                       .then(function (res) {
                           expect(res).to.be.json;
                           expect(res).to.have.status(HttpStatus.OK);

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

        it('returns 400 for deleting shipping method of not provided cart', function () {
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'deleteShippingMethod')
                       .query({})
                       .catch(function (err) {
                           expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                       });
        });
        it('returns 404 for deleting shipping method of non existing cart', function () {
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'deleteShippingAddress')
                       .query({
                                  id: 'non-existing-cart-id'
                              })
                       .catch(function (err) {
                           expect(err.response).to.have.status(HttpStatus.NOT_FOUND);
                       });
        });

        it('removes shipping method', function () {
            const args = {
                id: cartId,
                shippingMethodId: '6f0b3638-73a5-4d80-8455-081d3e9f98bb'
            };
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postShippingAddress')
                       .query({
                           id: cartId
                       })
                       .send({
                           address: {country: 'US'}
                       })
                       .then(function (res) {
                           expect(res).to.be.json;
                           expect(res).to.have.status(HttpStatus.OK);
                           expect(res.body).to.have.property('shippingAddress');

                           return chai.request(env.openwhiskEndpoint)
                               .post(env.cartsPackage + 'postShippingMethod')
                               .query(args)
                               .then(function (res) {
                                   expect(res).to.be.json;
                                   expect(res).to.have.status(HttpStatus.OK);
                                   expect(res.body).to.have.property('shippingInfo');

                                  return  chai.request(env.openwhiskEndpoint)
                                       .post(env.cartsPackage + 'deleteShippingMethod')
                                       .query({id: cartId})
                                       .then(function (res) {
                                           expect(res).to.be.json;
                                           expect(res).to.have.status(HttpStatus.OK);
                                           expect(res.body).to.not.have.property('shippingInfo');
                                       });
                               })

                       })
        });

    });
});