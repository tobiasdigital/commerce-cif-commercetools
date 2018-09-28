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

const request = require('request-promise-native');
const { parse } = require('graphql');

const createClient = require('@commercetools/sdk-client').createClient;
const CommerceToolsClientBase = require('@adobe/commerce-cif-commercetools-common/CommerceToolsClientBase');

const { gqlToObject, makeGraphqlQuery } = require('../../../commerce-cif-common/src/graphql/utils');
const ObjectTransformer = require('../../../commerce-cif-common/src/graphql/ObjectTransformer');
const CTtransforms = require('./CIFtoCTTransformer');
const transformer = new ObjectTransformer(CTtransforms);
const graphqlBase = require('../../../commerce-cif-common/src/graphql/introspectionHandler').main;
const ArgsTransformer = require('../../../commerce-cif-common/src/graphql/ArgsTransformer');
const { args, forceFields } = require('./CIFtoCTArgs');

const argsTransformer = new ArgsTransformer(args, forceFields, '__args');

const ObjectMapper = require('../../../commerce-cif-common/src/graphql/ResponseMapper');
const CTtoCIFMapper = require('./CTtoCIFMapper');
const mapper = new ObjectMapper(CTtoCIFMapper);

function main(args) {
    return graphqlBase(args, commerceToolsEndpoint);
}

/**
 * This action handles incoming GraphQL data queries.
 * 
 * @param   {GraphQLSource} args.query      entering GraphQL query
 * 
 * @return  {Promise.<ExecutionResult>}
 */
function commerceToolsEndpoint(args) {
    let query = args.query;

    let originalQueryObject = gqlToObject(parse(query).definitions[0]); //transform into JS object

    let CTObject = JSON.parse(JSON.stringify(originalQueryObject));
    const client = new CommerceToolsClientBase(args, createClient, '', 'graphql');

    transformer.transform(CTObject);
    try {
        argsTransformer.transformRecursive(CTObject);
    } catch (e) {
        return client._handleError(e);
    }

    return request({
        uri: "https://303qXrKYRr9dkiNECs-_Q1zU:d1wP6gie-iTGRRm3WlZbGxpi3muJDbM5@auth.commercetools.co/oauth/token?grant_type=client_credentials&scope=manage_project:aem-weretail-demo",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(tokenResponse => {
        const authToken = JSON.parse(tokenResponse).access_token;
        const options = buildRequest(makeGraphqlQuery(CTObject), authToken);
        return request(options)
            .then(response => {
                let body;
                if (response.body.errors) {
                    let errors = response.body.errors;
                    errors.forEach(e => {
                        delete e.locations; //locations do not always match CIF query
                    });
                    body = response.body;
                } else {
                    body = { data: mapper.map(originalQueryObject, response.body.data) };
                }

                return client._handleSuccess(body); 
            })
            .catch(e => {
                console.log(e);
                return client._handleError(e);
            });
    }).catch(e => {
        console.log(e);
        return client._handleError(e);
    });
}

/**
 * 
 * @private 
 */
function buildRequest(query, authToken) {
    return {
        uri: "https://api.commercetools.co/aem-weretail-demo/graphql",
        method: "POST",
        headers: {
            'Store': 'default',
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        json: true,
        body: {
            query: query,
            operationName: null,
            variables: null
        },
        resolveWithFullResponse: true
    };
}

module.exports.main = main;