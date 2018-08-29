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

const expect = require('chai').expect;
const PaymentMapper = require('../../src/carts/PaymentMapper');

describe('commercetools PaymentMapper', () => {

    let ccifPayment = {
        token: '1234',
        method: 'credit-card',
        methodId: 'credit-card',
        statusCode: '1',
        status: 'Paid',
        value: {
            amount: 17900,
            currency: 'USD'
        }
    };
    
    describe('Unit tests', () => {
        
        let paymentMapper = new PaymentMapper();

        it('PaymentMapper should properly map CCIF and CT objects reversibly', () => {
            let ctPayment = paymentMapper.mapPaymentDraft(ccifPayment);
            let payment = paymentMapper._mapPayment(ctPayment);
            
            // stringify and parse to remove undefined fields
            payment = JSON.parse(JSON.stringify(payment));
            
            expect(ccifPayment).to.deep.include(payment);
        });

    });
});
