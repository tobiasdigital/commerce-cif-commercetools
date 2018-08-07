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

const Payment = require('@adobe/commerce-cif-model').Payment;
const MoneyValue = require('@adobe/commerce-cif-model').MoneyValue;

/**
 * Utility class to map commercetools objects to CCIF objects. Private marked methods should not be used outside
 * of this class.
 */
class PaymentMapper {

    /**
     * Maps a commercetools payment response to a CCIF payment
     *
     * @param ctResult        JSON object returned by the commercetools payments.
     * @returns {Payment}     CCIF payment representation.
     */
    mapPayment(result) {
        if(result.body == undefined) return null;
        return this._mapPayment(result.body);
    }

    /**
     * IMPORTANT
     * 
     * The mapping between CCIF and CommerceTools payments is "experimental".
     * For example, we map the CCIF 'token' field to CT 'externalId' field,
     * simply because we cannot use CT's 'interfaceId' because it has to be unique
     * in combination to CT's 'paymentInterface' and there is no better easy match.
     * What is REALLY important is just that the 2 mappers below are mapping
     * fields reversibly.
     */
    
    /**
     * Maps a single Commerce Tools payment to a CCIF payment.
     * @param ctPayment
     * @return {Payment}
     * @private
     */
    _mapPayment(ctPayment) {
        let ccifPayment = new Payment.Builder()
            .withId(ctPayment.id)
            .withMethod(ctPayment.paymentMethodInfo.method)
            .build();

        ccifPayment.token = ctPayment.externalId;
        ccifPayment.statusCode = ctPayment.paymentStatus.interfaceCode;
        ccifPayment.status = ctPayment.paymentStatus.interfaceText;
        ccifPayment.createdAt = ctPayment.createdAt;
        ccifPayment.lastModifiedAt = ctPayment.lastModifiedAt;
        ccifPayment.amount = new MoneyValue.Builder()
            .withAmount(ctPayment.amountPlanned.centAmount)
            .withCurrency(ctPayment.amountPlanned.currencyCode)
            .build();
        
        return ccifPayment;
    }
    
    /**
     * Maps a CCIF payment to a CommerceTools PaymentDraft object.
     * @param {Payment} payment
     * @return A CommerceTools PaymentDraft object.
     */
    mapPaymentDraft(payment) {
        let paymentDraft = {};
        
        paymentDraft.externalId = payment.token;
        
        paymentDraft.paymentMethodInfo = {};
        paymentDraft.paymentMethodInfo.method = payment.method;
        
        paymentDraft.paymentStatus = {};
        paymentDraft.paymentStatus.interfaceCode = payment.statusCode;
        paymentDraft.paymentStatus.interfaceText = payment.status;
        
        if (payment.amount) {
            paymentDraft.amountPlanned = {};
            paymentDraft.amountPlanned.centAmount = payment.amount.amount;
            paymentDraft.amountPlanned.currencyCode = payment.amount.currency;
        }
        
        if (payment.customer) {
            paymentDraft.customer = {};
            paymentDraft.customer.typeId = 'customer';
            paymentDraft.customer.id = payment.customer.id;
        }
        
        return paymentDraft;
    }
}

module.exports = PaymentMapper;