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
const setup = require('../lib/setupIT.js').setup;

const expect = chai.expect;

chai.use(chaiHttp);


describe('commercetools common', function() {

    describe('Integration tests', function() {

        // Get environment
        let env = setup();

        // Increase test timeout
        this.slow(env.slow);
        this.timeout(env.timeout);

        it('returns getCategories with performance headers', function() {
            return chai.request(env.openwhiskEndpoint)
                .get(env.categoriesPackage + 'getCategories')
                .query({
                    type: 'flat'
                })
                .set('Perf-Activate', 'YES')
                .set('Perf-Action-Id', 'my-id')
                .set('Cache-Control', 'no-cache, no-store, no-transform, must-revalidate')
                .set('Cache-Control', 'no-cache')
                .then(function (res) {
                    expect(res).to.have.header('perf-activate', 'YES');
                    expect(res).to.have.header('perf-action-id', 'my-id');
                    expect(res).to.have.header('perf-backend-req-in-my-id-0');
                    expect(res).to.have.header('perf-backend-req-out-my-id-0');
                    expect(res).to.have.header('perf-backend-req-url-my-id-0');
                    expect(res).to.have.header('perf-ow-seq-end-my-id');
                    expect(res).to.have.header('perf-ow-seq-start-my-id');
                });
        });
    });
});