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


describe('commercetools postPayment', function () {

    describe('Integration tests', function () {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        let cartId;
        const productVariantId = '90ed1673-4553-47c6-9336-5cb23947abb2-1';
        let ccifPayment = {
            token: '1234',
            method: 'credit-card',
            statusCode: '1',
            status: 'Paid',
            amount: {
                centAmount: 17900,
                currency: 'USD'
            }
        };
        
        /** Create empty cart. */
        beforeEach(function () {
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postCartEntry')
                       .query({
                                  currency: 'USD',
                                  quantity: 5,
                                  productVariantId: productVariantId
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

        it('returns 400 for posting the payment to an non existing cart', function () {
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postPayment')
                       .query({
                           id: 'non-existing-cart-id',
                       })
                       .send({
                           payment: ccifPayment
                       })
                       .catch(function (err) {
                           expect(err.response).to.have.status(HttpStatus.NOT_FOUND);
                       });
        });

        it('returns 400 for posting to payment without payment', function () {
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postPayment')
                       .query({
                           id: cartId
                       })
                       .catch(function (err) {
                           expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                       });
        });

        it('sets payment method', function () {   
            const args = {
                id: cartId,
            };
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postPayment')
                       .query(args)
                       .send({
                           payment: ccifPayment
                       })
                       .then(function(res) {
                           let payment = res.body.payment;
                           expect(res).to.be.json;
                           expect(res).to.have.status(HttpStatus.OK);
                           expect(payment).to.have.property('id');
                           expect(payment).to.have.property('method');
                           expect(payment).to.have.property('amount');
                           expect(payment.amount).to.have.property('currency');
                           expect(payment.amount).to.have.property('centAmount');
                           expect(payment).to.have.property('createdDate');
                           expect(payment).to.have.property('lastModifiedDate');
                       });
        });
        
        it('returns 400 for posting to payment when already exists', function () {
            const args = {
                id: cartId,
            };
            return chai.request(env.openwhiskEndpoint)
                       .post(env.cartsPackage + 'postPayment')
                       .query(args)
                       .send({
                           payment: ccifPayment
                       })
                       .then(() => {
                           return chai.request(env.openwhiskEndpoint)
                               .post(env.cartsPackage + 'postPayment')
                               .query(args)
                               .catch(err => {
                                   expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                               });
                       });
        });
    });
});