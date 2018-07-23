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


describe('commercetools searchProducts', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        it('returns a 500 error if parameters are missing', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .set('Accept-Language', 'en-US')
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

        it('returns products in a category', function() {
            const categoryId = '743fd9df-6534-4962-85ab-6cc5e55635c7';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `categories.id:"${categoryId}"`
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.count).to.equal(5);
                    expect(res.body.results).to.have.lengthOf(5);
                    for(let result of res.body.results) {
                        expect(result.categories).to.deep.include({"id": categoryId});
                    }
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns products in a category and all its subcategories', function() {
            const subtree = '693b0fc5-7283-4673-a362-589d37fb7b73';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `categories.id:subtree("${subtree}")`
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.count).to.equal(24);
                    expect(res.body.results).to.have.lengthOf(24);
                    for(let result of res.body.results) {
                        expect(result.categories).to.have.lengthOf.at.least(1);
                    }
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns a product with a given SKU', function() {
            const sku = 'meskwielt.1-xs';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `variants.sku:"${sku}"`
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.count).to.equal(1);

                    // Verify structure
                    const product = res.body.results[0];
                    expect(product).to.have.own.property('name');
                    expect(product.name).to.equal('El Gordo Down Jacket');
                    expect(product).to.have.own.property('masterVariantId');
                    expect(product).to.have.own.property('description');
                    expect(product).to.have.own.property('id');
                    expect(product).to.have.own.property('categories');
                    expect(product).to.have.own.property('variants');
                    expect(product).to.have.own.property('createdDate');

                    // Find variant with requested sku
                    let found = false;
                    for (let variant of product.variants) {
                        if (variant.sku === sku) found = true;
                    }
                    expect(found).to.be.true;
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns products matching a search string', function() {
            const searchTerm = 'jacket';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    text: searchTerm
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.count).to.equal(4);
                    expect(res.body.results).to.have.lengthOf(4);
                    expect(res.text.split(searchTerm)).to.have.lengthOf.at.least(4);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns products sorted by their name', function() {
            const categoryId = '743fd9df-6534-4962-85ab-6cc5e55635c7';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `categories.id:"${categoryId}"`,
                    sort: 'name.desc',
                    limit: 5
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.count).to.equal(5);
                    expect(res.body.results).to.have.lengthOf(5);

                    // Verfiy sorting
                    const names = res.body.results.map(r => r.name);
                    expect(names).to.have.ordered.members(names.sort().reverse());
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns a 500 error for invalid sorting parameters', function() {
            const categoryId = '743fd9df-6534-4962-85ab-6cc5e55635c7';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `categories.id:"${categoryId}"`,
                    sort: 'abc.asc'
                })
                .set('Accept-Language', 'en-US')
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

        it('returns a subset of products as defined by paging parameters', function() {
            const subtree = '693b0fc5-7283-4673-a362-589d37fb7b73';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `categories.id:subtree("${subtree}")`,
                    limit: 10,
                    offset: 20
                })
                .set('Accept-Language', 'en-US')
                .then(function (res) {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.offset).to.equal(20);
                    expect(res.body.count).to.equal(4);
                    expect(res.body.total).to.equal(24);
                    expect(res.body.results).to.have.lengthOf(4);
                })
                .catch(function(err) {
                    throw err;
                });
        });

        it('returns a 500 error for invalid paging parameters', function() {
            const subtree = '693b0fc5-7283-4673-a362-589d37fb7b73';
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    filter: `categories.id:subtree("${subtree}")`,
                    limit: -1
                })
                .set('Accept-Language', 'en-US')
                .catch(function(err) {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

        it('returns empty values for an invalid facet query', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    text: 'jacket',
                    queryFacets: 'variants.attributes'
                })
                .set('Accept-Language', 'en-US')
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.facets).to.have.lengthOf(1);
                    expect(res.body.facets[0].facetValues).to.be.empty;
                });
        });

        it('returns auto discovered facets ', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    text: 'jacket',
                    queryFacets: 'auto'
                })
                .set('Accept-Language', 'en-US')
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.facets).to.have.lengthOf(7);
                });
        });

        it('returns 2 queried facets ', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    text: 'jacket',
                    queryFacets: 'variants.attributes.color.en|variants.attributes.size.en'
                })
                .set('Accept-Language', 'en-US')
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.facets).to.have.lengthOf(2);
                    expect(res.body.facets[0].facetValues).to.not.be.undefined;
                    expect(res.body.facets[1].facetValues).to.not.be.undefined;
                });
        });

        it('returns bad request for invalid facet filter', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    text: 'jacket',
                    queryFacets: 'variants.attributes.color.en|variants.attributes.size.en',
                    selectedFacets: 'variants.attributes.color.en',
                    productTypeId: '87238665-3388-4cf7-8a3f-bc3dd63724f4'
                })
                .set('Accept-Language', 'en-US')
                .catch(err => {
                    expect(err.response).to.have.status(HttpStatus.BAD_REQUEST);
                });
        });

        it('returns narrowed result based on facet selection', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.productsPackage + 'searchProducts')
                .query({
                    text: 'jacket',
                    queryFacets: 'variants.attributes.color.en|variants.attributes.size.en',
                    selectedFacets: 'variants.attributes.color.en:"red"',
                    productTypeId: '87238665-3388-4cf7-8a3f-bc3dd63724f4'
                })
                .set('Accept-Language', 'en-US')
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.have.status(HttpStatus.OK);
                    expect(res.body.count).to.equal(1);
                    expect(res.body.results).to.have.lengthOf(1);
                });
        });

    });
});