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

const ShippingMethod = require('@adobe/commerce-cif-model').ShippingMethod;
const PagedResponse = require('@adobe/commerce-cif-model').PagedResponse;
const MoneyValue = require('@adobe/commerce-cif-model').MoneyValue;

/**
 * Utility class to map commercetools objects to CCIF objects. Private marked methods should not be used outside
 * of this class.
 */
class ShippingMethodMapper {

    /**
     * Maps an array of commercetools shipping methods to an array of CCIF shipping methods
     *
     * @param ctShippingMethods     JSON array of commercetools shipping methods.
     * @returns {ShippingMethod}    An array of CCIF shipping methods.
     */
    mapShippingMethods(result) {
        if (result.body.results) { // we have a paged result set
            let results = this._mapShippingMethods(result.body.results);
            return new PagedResponse.Builder()
                .withOffset(result.body.offset || 0)
                .withCount(result.body.count)
                .withTotal(result.body.total)
                .withResults(results)
                .build();
        } else { // we have a simple array only
            return this._mapShippingMethods(result.body);
        }
    }

    /**
     * @private
     */
    _mapShippingMethods(ctShippingMethods) {
        return ctShippingMethods.map(ctShippingMethod => this._mapShippingMethod(ctShippingMethod));
    }

    /**
     * @private
     */
    _mapShippingMethod(ctShippingMethod) {
        let shippingMethod = new ShippingMethod.Builder()
            .withId(ctShippingMethod.id)
            .withName(ctShippingMethod.name)
            .withCost(this._mapShippingMethodPrice(ctShippingMethod.zoneRates))
            .build();

        shippingMethod.description = ctShippingMethod.description;
        return shippingMethod;
    }

    /**
     * @private
     */
    _mapShippingMethodPrice(ctZoneRates) {
        // we only support one price per shipping method, therefor we try to find the first zone rate with at
        // matching price (isMatching == true), otherwise picking the first price
        let matchingZoneRates = ctZoneRates.filter(
            ctZoneRate => ctZoneRate.shippingRates.some(shippingRate => shippingRate.isMatching == true))
                                           .map(ctZoneRate => {
                                               return ctZoneRate.shippingRates.filter(
                                                   shippingRate => shippingRate.isMatching == true);
                                           });
        let ctShippingRate;
        if (Array.isArray(matchingZoneRates)) {
            matchingZoneRates = [].concat.apply([], matchingZoneRates);

            if (Array.isArray(matchingZoneRates) && matchingZoneRates.length > 0) {
                ctShippingRate = matchingZoneRates[0];
            } else if (Array.isArray(ctZoneRates) && ctZoneRates.length > 0 && Array.isArray(
                    ctZoneRates[0].shippingRates) && ctZoneRates[0].shippingRates.length > 0) {
                ctShippingRate = ctZoneRates[0].shippingRates[0];
            }
        }
        if (ctShippingRate) {
            let p = new MoneyValue.Builder()
                .withAmount(ctShippingRate.price.centAmount)
                .withCurrency(ctShippingRate.price.currencyCode)
                .build();
            p.country = ctShippingRate.price.country;
            return p;
        }
    }
}

module.exports = ShippingMethodMapper;