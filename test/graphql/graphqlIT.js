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
//const requiredFields = require('../lib/queriedFields');

const expect = chai.expect;
//chai.use(require("chai-sorted"));
chai.use(chaiHttp);
const {
    allFieldsQuery,
    introSpectionQuery,
    // pageInfoQuery,
    // syntaxError,
    // invalidField
} = require('../resources/queries');

const {
    allFieldsQueryResult
} = require('../resources/searchProducts-samples');

describe('commerce tools graphql endpoint', function () {
    describe('Integration tests', function () {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        it('Returns executable Schema for introspection query', function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.graphqlPackage + 'graphql')
                .set('Cache-Control', 'no-cache')
                .send({ query: introSpectionQuery })
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.data).to.have.ownProperty("__schema");
                });
        });

        it('returns all fields with filter parameter', function () {
            return chai.request(env.openwhiskEndpoint)
                .post(env.graphqlPackage + 'graphql')
                .set('Cache-Control', 'no-cache')
                .send({ query: allFieldsQuery })
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body).to.deep.equal(allFieldsQueryResult);
                });
        });

        // it('returns only info fields', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: pageInfoQuery })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);
        //             //requiredFields.verifyPagedResponse(res.body.data.searchProducts);
        //             requiredFields.verifyQueriedFields(res.body.data, gqlToObject(parse(pageInfoQuery).definitions[0]));

        //             expect(res.body.data.searchProducts.count).to.equal(1);
        //             expect(res.body.data.searchProducts.total).to.equal(1);
        //             expect(res.body.data.searchProducts.offset).to.equal(0);
        //         });
        // });

        // it('Gets only simple fields ', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: simpleFieldsQuery })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);

        //             requiredFields.verifyQueriedFields(res.body.data, gqlToObject(parse(simpleFieldsQuery).definitions[0]));

        //             const product = res.body.data.searchProducts.results[0];
        //             expect(product.name).to.equal('El Gordo Down Jacket');
        //         });
        // });

        // it('Gets product id without querying for sku', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: `{ searchProducts(text: "meskwielt"){ results {id}}}` })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);
        //             requiredFields.verifyQueriedFields(res.body.data, gqlToObject(parse(`{ searchProducts(text: "meskwielt"){ results {id}}}`).definitions[0]));
        //             const product = res.body.data.searchProducts.results[0];
        //             expect(product.id).to.equal('meskwielt');
        //         });
        // });

        // it('Gets product masterVariant without querying variants or sku', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: `{ searchProducts(text: "meskwielt"){ results {masterVariantId}}}` })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);
        //             requiredFields.verifyQueriedFields(res.body.data, gqlToObject(parse(`{ searchProducts(text: "meskwielt"){ results {masterVariantId}}}`).definitions[0]));
        //             const product = res.body.data.searchProducts.results[0];
        //             expect(product.masterVariantId).to.equal('meskwielt-Purple-XS');
        //         });
        // });

        // it('returns fields that don\'t exist in magento', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: `{ searchProducts(text: "meskwielt"){ results {prices {country} variants { available}}}}` })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);
        //             requiredFields.verifyQueriedFields(res.body.data, gqlToObject(parse(`{ searchProducts(text: "meskwielt"){ results {prices {country} variants { available}}}}`).definitions[0]));
        //             const product = res.body.data.searchProducts.results[0];
        //             expect(product.prices[0].country).to.be.null;
        //             //should be null.. but sets to true in ProductMapper
        //             expect(product.variants[0].available).to.be.true;
        //         });
        // });

        // it('throws Syntax Error', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: syntaxError })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);
        //             expect(res.body).to.have.ownProperty("errors");
        //             let errors = res.body.errors;
        //             expect(errors).to.be.an('array');
        //             expect(errors[0]).to.haveOwnProperty("message");
        //             let message = errors[0].message;
        //             expect(message).to.include("Syntax Error:");
        //         });
        // });

        // it('throws Error for invalid field', function () {
        //     return chai.request(env.openwhiskEndpoint)
        //         .post(env.graphqlPackage + 'graphql')
        //         .set('Cache-Control', 'no-cache')
        //         .send({ query: invalidField })
        //         .then(function (res) {
        //             expect(res).to.be.json;
        //             expect(res).to.have.status(HttpStatus.OK);
        //             expect(res.body).to.have.ownProperty("errors");
        //             let errors = res.body.errors;
        //             expect(errors).to.be.an('array');
        //             expect(errors[0]).to.haveOwnProperty("message");
        //             let message = errors[0].message;
        //             expect(message).to.include("Cannot query field");
        //         });
        // });
    });
});