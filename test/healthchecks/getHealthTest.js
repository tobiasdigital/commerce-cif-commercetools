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
const setup = require('../lib/setupTest').setup;
const config = require('../lib/config').config;

describe('commercetools getHealth', () => {
    describe('Unit tests', () => {
        setup(this, __dirname, 'getHealth');

        it('returns a correct response for a healthy service', () => {
            const expectedArgs = {
                uri: `/${config.CT_PROJECTKEY}/`,
                headers: undefined,
                method: 'GET'
            };
            return this.prepareResolve({}, expectedArgs)
                .execute({})
                .then(result => {
                    assert.isDefined(result);
                    assert.isDefined(result.body.reports);
                    let { reports } = result.body;
                    assert.equal(reports.length, 1);
                    assert.equal(reports[0].healthy, true);
                });
        });

        it('returns a correct response for a non-healthy service', () => {
            const expectedArgs = {
                uri: `/${config.CT_PROJECTKEY}/`,
                headers: undefined,
                method: 'GET'
            };

            return this.prepareReject(expectedArgs)
                .execute({})
                .then(result => {
                    assert.isDefined(result);
                    assert.isDefined(result.body.reports);
                    let { reports } = result.body;
                    assert.equal(reports.length, 1);
                    assert.equal(reports[0].healthy, false);
                    assert.equal(result.statusCode, 503);
                });
        });
    });
});
