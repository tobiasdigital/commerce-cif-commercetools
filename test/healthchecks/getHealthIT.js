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

describe('commercetools getHealth', () => {
  describe('Integration tests', () => {
    // Get environment
    let env = setup();

    it('returns the correct response for a healthy service', () => {
      return chai
        .request(env.openwhiskEndpoint)
        .get(`${env.healthchecksPackage}getHealth`)
        .set('Cache-Control', 'no-cache')
        .then(res => {
          expect(res).to.have.status(HttpStatus.OK);
          expect(res.body).to.exist;
          expect(res.body.reports).to.exist;
          let reports = res.body.reports;
          expect(reports).to.have.lengthOf(1);
          expect(reports[0].healthy).to.be.true;
        });
    });

    it('return an error response for a non-healthy service', () => {
      return chai
        .request(env.openwhiskEndpoint)
        .get(`${env.healthchecksPackage}getHealth`)
        .set('Cache-Control', 'no-cache')
        .query({ CT_API_HOST: 'https://unknown.host/' })
        .then(res => {
          expect(res).to.have.status(HttpStatus.SERVICE_UNAVAILABLE);
          expect(res.body.reports).to.exist;
          let reports = res.body.reports;
          expect(reports).to.have.lengthOf(1);
          expect(reports[0].healthy).to.be.false;
        });
    });
  });
});
