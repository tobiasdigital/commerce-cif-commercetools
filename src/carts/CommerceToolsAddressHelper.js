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

const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const CommerceToolsCart = require('./CommerceToolsCart');
const CcifIdentifier = require('@adobe/commerce-cif-commercetools-common/CcifIdentifier');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * Helper class for posting and deleting a cart shipping or billing address.
 */
class CommerceToolsAddressHelper {

    static SET_BILLING_ADDRESS() {
        return 'setBillingAddress';
    }

    static SET_SHIPPING_ADDRESS() {
        return 'setShippingAddress';
    }

    /**
     * @param createClient              the commerce tools client
     * @param args                      arguments as forwarded from the action
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     * @return {Promise}
     */
    static postShippingAddress(createClient, args, cartMapper) {
        return CommerceToolsAddressHelper._post(createClient, args, cartMapper, CommerceToolsAddressHelper.SET_SHIPPING_ADDRESS());
    }

    /**
     * @param createClient  the commerce tools client
     * @param args          arguments as forwarded from the action
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     * @return {Promise}
     */
    static postBillingAddress(createClient, args, cartMapper) {
        return CommerceToolsAddressHelper._post(createClient, args, cartMapper, CommerceToolsAddressHelper.SET_BILLING_ADDRESS());
    }

    /**
     * @param createClient  the commerce tools client
     * @param args          arguments as forwarded from the action
     * @param methodName    commerce tools method name
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     * @return {Promise}
     * @private
     */
    static _post(createClient, args, cartMapper, methodName) {
        const validator = new InputValidator(args, ERROR_TYPE);
        validator
            .checkArguments()
            .mandatoryParameter('id')
            .mandatoryParameter('address');
        
        if (validator.error) {
            return validator.buildErrorResponse();
        }
        
        const addressValidator = new InputValidator(args.address, ERROR_TYPE);
        addressValidator
            .checkArguments()
            .atLeastOneParameter(['title', 'salutation', 'firstName', 'lastName', 'email', 'phone', 'mobile',
                                  'fax', 'country', 'region', 'city', 'postalCode', 'organizationName', 'department',
                                  'streetNumber', 'streetName', 'additionalStreetInfo', 'additionalAddressInfo']);

        if (addressValidator.error) {
            return addressValidator.buildErrorResponse();
        }
        
        let cart = new CommerceToolsCart(args, createClient, cartMapper);
        
        // all address fields have the same name in CT except company vs. organizationName 
        args.address.company = args.address.organizationName;
        delete args.address.organizationName;

        // cart data for cart update action
        const data = {
            actions: [
                {
                    action: methodName,
                    address: args.address
                }
            ]
        };
        
        let ccifId = new CcifIdentifier(args.id);
        return cart
            .byId(ccifId.getCommerceToolsId())
            .postCartData(args.id, data);
    }

    /**
     *
     * @param createClient  the commerce tools client
     * @param args          arguments as forwarded from the action
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     * @return {Promise}
     */
    static deleteBillingAddress(createClient, args, cartMapper) {
        return CommerceToolsAddressHelper._delete(createClient, args, cartMapper, CommerceToolsAddressHelper.SET_BILLING_ADDRESS());
    }

    /**
     *
     * @param createClient  the commerce tools client
     * @param args          arguments as forwarded from the action
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     * @return {Promise}
     */
    static deleteShippingAddress(createClient, args, cartMapper) {
        return CommerceToolsAddressHelper._delete(createClient, args, cartMapper, CommerceToolsAddressHelper.SET_SHIPPING_ADDRESS());
    }

    /**
     * @param createClient  the commerce tools client
     * @param args          arguments as forwarded from the action
     * @param methodName    commerce tools method name
     * @param cartMapper {Function}     commerce tools cif cart mapper handler
     * @return {Promise}
     *
     * @private
     */
    static _delete(createClient, args, cartMapper, methodName) {
        const validator = new InputValidator(args, ERROR_TYPE);
        validator
            .checkArguments()
            .mandatoryParameter('id');
        if (validator.error) {
            return validator.buildErrorResponse();
        }
        let ccifId = new CcifIdentifier(args.id);
        let cart = new CommerceToolsCart(args, createClient, cartMapper);
        cart.byId(ccifId.getCommerceToolsId());
        // cart data for cart update action
        const data = {
            actions: [
                {
                    action: methodName
                }
            ]
        };

        return cart.postCartData(args.id, data);
    }
}

module.exports = CommerceToolsAddressHelper;