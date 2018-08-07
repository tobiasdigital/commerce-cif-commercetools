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
const sampleCart1 = require('../resources/sample-cart');
const sampleCartWithGiftEntry = require('../resources/sample-cart-with-gift-entry');
const sampleCartWithDiscount = require('../resources/sample-cart-with-cart-discount');
const sampleCartWithMultipleDiscounts = require('../resources/sample-cart-with-multiple-discounts');
const sampleCartWithTax = require('../resources/sample-cart-with-tax');
const sampleSimpleCart = require('../resources/sample-simple-cart');
const sampleCartWithCoupon = require('../resources/sample-cart-with-coupon');
const MissingProperty = require('@adobe/commerce-cif-common').MissingPropertyException;
const utils = require('../lib/utils');
const MoneyValue = require('@adobe/commerce-cif-model').MoneyValue;
const Discount = require('@adobe/commerce-cif-model').Discount;
const DiscountType = require('@adobe/commerce-cif-common/model').DiscountType;
const LanguageParser = require('../../src/common/LanguageParser');
const CartMapper = require('../../src/carts/CartMapper');

describe('commercetools CartMapper', () => {

    describe('Unit tests', () => {
        let cartData = null;
        let cartDataWithDiscount = null;
        let cartDataWithMultipleDiscounts = null;
        let args = {
            __ow_headers: {
                'accept-language': 'en-US'
            }
        };
        let languageParser = new LanguageParser(args);
        let cartMapper = new CartMapper(languageParser);

        beforeEach(() => {
            // clone original sample data before each test
            cartData = utils.clone(sampleCart1);
            cartDataWithDiscount = utils.clone(sampleCartWithDiscount);
            cartDataWithMultipleDiscounts = utils.clone(sampleCartWithMultipleDiscounts);
        });

        it('cart entries', () => {
            let mappedCartEntries = cartMapper._mapCartEntries(sampleCart1.body.lineItems);
            assert.isDefined(mappedCartEntries);
            assert.isArray(mappedCartEntries);
            assert.lengthOf(mappedCartEntries, sampleCart1.body.lineItems.length);

            mappedCartEntries.forEach(cartEntry => {
                assert.containsAllKeys(cartEntry, ['id', 'quantity', 'productVariant']);
            });
        });

        it('cart - success', () => {
            let mappedCart = cartMapper.mapCart(cartData, args);
            assert.strictEqual(mappedCart.id, cartData.body.id + '-' +  cartData.body.version);
            assert.strictEqual(mappedCart.entries.length, cartData.body.lineItems.length);
            assert.strictEqual(mappedCart.createdAt, cartData.body.createdAt);
            assert.strictEqual(mappedCart.lastModifiedAt, cartData.body.lastModifiedAt);
            assert.strictEqual(mappedCart.customerId, cartData.body.customerId);

            //asserts shipping and billing address
            assertEqualAddress(mappedCart['shippingAddress'], cartData.body['shippingAddress']);
            assertEqualAddress(mappedCart['billingAddress'], cartData.body['billingAddress']);

            assert.strictEqual(mappedCart.shippingInfo.id, cartData.body.shippingInfo.shippingMethod.id);
            assert.strictEqual(mappedCart.shippingInfo.name, cartData.body.shippingInfo.shippingMethodName);
            assert.strictEqual(mappedCart.shippingInfo.cost.currency, cartData.body.shippingInfo.price.currencyCode);
            assert.strictEqual(mappedCart.shippingInfo.cost.amount, cartData.body.shippingInfo.price.centAmount);
            assert.strictEqual(mappedCart.shippingInfo.discountedPrice.currency,
                               cartData.body.shippingInfo.discountedPrice.value.currencyCode);
            assert.strictEqual(mappedCart.shippingInfo.discountedPrice.amount,
                               cartData.body.shippingInfo.discountedPrice.value.centAmount);

            cartData.body.shippingInfo.discountedPrice.includedDiscounts.forEach((ctDiscount) => {
                let needleValue = new MoneyValue.Builder()
                    .withAmount(ctDiscount.discountedAmount.centAmount)
                    .withCurrency(ctDiscount.discountedAmount.currencyCode)
                    .build();
                let needleDiscount = new Discount.Builder()
                        .withValue(needleValue)
                        .withId(ctDiscount.discount.id)
                        .withType(DiscountType.SHIPPING)
                        .build();

                if (ctDiscount.discount.obj.name) {
                    needleDiscount.name = ctDiscount.discount.obj.name.en;
                }
                if (ctDiscount.discount.obj.description) {
                    needleDiscount.description = ctDiscount.discount.obj.description.en;
                }
                assert.deepInclude(mappedCart.discounts, needleDiscount, JSON.stringify(mappedCart.discounts, null, 4));
            });

            mappedCart.entries.forEach((cartEntry, index) => {
                let lineItem = cartData.body.lineItems[index];
                assert.strictEqual(cartEntry.id, lineItem.id);
                assert.strictEqual(cartEntry.quantity, lineItem.quantity);
                assert.strictEqual(cartEntry.productVariant.sku, lineItem.variant.sku);
                assert.strictEqual(cartEntry.productVariant.id, lineItem.productId + '-' + lineItem.variant.id);
                assert.strictEqual(cartEntry.productVariant.name, lineItem.name.en);
                assert.strictEqual(cartEntry.unitPrice.amount, lineItem.price.value.centAmount);
                assert.strictEqual(cartEntry.unitPrice.currency, lineItem.price.value.currencyCode);
                assert.strictEqual(cartEntry.price.amount, lineItem.totalPrice.centAmount);
                assert.strictEqual(cartEntry.price.currency, lineItem.totalPrice.currencyCode);
                assert.strictEqual(cartEntry.type, 'REGULAR');
                assert.isUndefined(cartEntry.discountedPrice);
                assert.isUndefined(cartEntry.discounts);
            });

            assert.isDefined(mappedCart.payment);
            let ctPayment = cartData.body.paymentInfo.payments[0];
            assert.strictEqual(mappedCart.payment.id, ctPayment.id);
            assert.strictEqual(mappedCart.payment.method, ctPayment.obj.paymentMethodInfo.method);
            assert.strictEqual(mappedCart.payment.token, ctPayment.interfaceId);
            assert.strictEqual(mappedCart.payment.statusCode, ctPayment.obj.paymentStatus.interfaceCode);
            assert.strictEqual(mappedCart.payment.status, ctPayment.obj.paymentStatus.interfaceText);
            assert.strictEqual(mappedCart.payment.amount.amount, ctPayment.obj.amountPlanned.centAmount);
            assert.strictEqual(mappedCart.payment.amount.currency, ctPayment.obj.amountPlanned.currencyCode);
            assert.strictEqual(mappedCart.payment.amount.currency, ctPayment.obj.amountPlanned.currencyCode);

        });

        it('cart - check total product price when no shipping info', () => {
            let cartDataNoShipping = JSON.parse(JSON.stringify(sampleCart1));
            delete cartDataNoShipping.body.shippingInfo;
            let mappedCart = cartMapper.mapCart(cartDataNoShipping, args);
            assert.strictEqual(mappedCart.productTotalPrice.amount, cartDataNoShipping.body.totalPrice.centAmount);
            assert.strictEqual(mappedCart.productTotalPrice.currency, cartDataNoShipping.body.totalPrice.currencyCode);
        });

        it('cart - check total product price when no discount shipping info price', () => {
            let cartDataNoDiscountedShipping = JSON.parse(JSON.stringify(sampleCartWithTax));
            delete cartDataNoDiscountedShipping.body.shippingInfo.discountedPrice;
            let mappedCart = cartMapper.mapCart(cartDataNoDiscountedShipping, args);

            let calculatedProductPrice = mappedCart.grossTotalPrice.amount - mappedCart.shippingInfo.cost.amount;
            assert.strictEqual(mappedCart.productTotalPrice.amount, calculatedProductPrice);
            assert.strictEqual(mappedCart.productTotalPrice.currency, cartDataNoDiscountedShipping.body.totalPrice.currencyCode);
        });

        it('cart - fail too many payments', () => {
            let cartDataMultiplePayment = utils.clone(cartData);
            cartDataMultiplePayment.body.paymentInfo.payments.push('{}');
            assert.throws(() => cartMapper.mapCart(cartDataMultiplePayment, args));
        });

        it('cart - success no shippingAddress', () => {
            let cartDataNoShippingAddress = utils.clone(cartData);
            delete cartDataNoShippingAddress.body.shippingAddress;
            let mappedCart = cartMapper.mapCart(cartDataNoShippingAddress, args);
            assert.isUndefined(mappedCart.shippingAddress);
        });

        it('cart - success no billingAddress', () => {
            let cartDataNoBillingAddress = utils.clone(cartData);
            delete cartDataNoBillingAddress.body.billingAddress;
            let mappedCart = cartMapper.mapCart(cartDataNoBillingAddress, args);
            assert.isUndefined(mappedCart.billingAddress);
        });

        it('cart - cart discount', () => {
            let mappedCart = cartMapper.mapCart(cartDataWithDiscount, args);

            mappedCart.entries.forEach((cartEntry, index) => {
                let lineItem = cartDataWithDiscount.body.lineItems[index];
                assert.strictEqual(cartEntry.unitPrice.amount, lineItem.price.value.centAmount);
                assert.strictEqual(cartEntry.unitPrice.currency, lineItem.price.value.currencyCode);
                assert.strictEqual(cartEntry.discountedPrice.amount,
                    lineItem.discountedPricePerQuantity[0].discountedPrice.value.centAmount * lineItem.quantity);
                assert.strictEqual(cartEntry.discountedPrice.currency,
                                   lineItem.discountedPricePerQuantity[0].discountedPrice.value.currencyCode);
                assert.strictEqual(cartEntry.discounts.length,
                                   lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts.length);
                assert.strictEqual(cartEntry.discounts[0].id,
                                   lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discount.id);
                assert.strictEqual(cartEntry.discounts[0].type, DiscountType.CART_ENTRY);
                assert.strictEqual(cartEntry.discounts[0].name,
                                   lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discount.obj.name.en);
                assert.strictEqual(cartEntry.discounts[0].description,
                                   lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discount.obj.description.en);
                assert.strictEqual(cartEntry.discounts[0].value.amount,
                    lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.centAmount *
                    lineItem.quantity);
                assert.strictEqual(cartEntry.discounts[0].value.currency,
                                   lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.currencyCode);
            });
        });

        it('cart - multiple cart discounts', () => {
            // act
            const mappedCart = cartMapper.mapCart(cartDataWithMultipleDiscounts, args);

            // assert
            const lineItem0 = cartDataWithMultipleDiscounts.body.lineItems[0];
            const lineItem1 = cartDataWithMultipleDiscounts.body.lineItems[1];

            assert.strictEqual(mappedCart.entries.length, 2, 'Cart has 2 cart entries');
            assert.strictEqual(mappedCart.entries[0].price.amount,
                lineItem0.quantity * lineItem0.price.value.centAmount);
            assert.strictEqual(mappedCart.entries[0].discountedPrice.amount,
                lineItem0.discountedPricePerQuantity[0].quantity *
                lineItem0.discountedPricePerQuantity[0].discountedPrice.value.centAmount +
                lineItem0.discountedPricePerQuantity[1].quantity *
                lineItem0.discountedPricePerQuantity[1].discountedPrice.value.centAmount);
            assert.strictEqual(mappedCart.entries[1].price.amount,
                lineItem1.quantity * lineItem1.price.value.centAmount);
            assert.strictEqual(mappedCart.entries[1].discountedPrice.amount,
                lineItem1.discountedPricePerQuantity[0].quantity *
                lineItem1.discountedPricePerQuantity[0].discountedPrice.value.centAmount);

            assert.strictEqual(mappedCart.entries[0].discounts[0].id, 'd84aa891-9fa4-4c77-a350-2578c812934c');
            assert.strictEqual(mappedCart.entries[1].discounts[0].id, 'd84aa891-9fa4-4c77-a350-2578c812934c');
            assert.strictEqual(mappedCart.entries[0].discounts[1].id, '80ac44bd-bcb9-414f-afb7-fe48207a2834');
            assert.strictEqual(mappedCart.entries[1].discounts[1].id, '80ac44bd-bcb9-414f-afb7-fe48207a2834');

            assert.strictEqual(mappedCart.entries[0].discounts[0].value.amount,
                lineItem0.discountedPricePerQuantity[0].quantity *
                lineItem0.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.centAmount +
                lineItem0.discountedPricePerQuantity[1].quantity *
                lineItem0.discountedPricePerQuantity[1].discountedPrice.includedDiscounts[0].discountedAmount.centAmount);
            assert.strictEqual(mappedCart.entries[0].discounts[1].value.amount,
                lineItem0.discountedPricePerQuantity[0].quantity *
                lineItem0.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[1].discountedAmount.centAmount +
                lineItem0.discountedPricePerQuantity[1].quantity *
                lineItem0.discountedPricePerQuantity[1].discountedPrice.includedDiscounts[1].discountedAmount.centAmount);
            assert.strictEqual(mappedCart.entries[1].discounts[0].value.amount,
                lineItem1.discountedPricePerQuantity[0].quantity *
                lineItem1.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount.centAmount);
            assert.strictEqual(mappedCart.entries[1].discounts[1].value.amount,
                lineItem1.discountedPricePerQuantity[0].quantity *
                lineItem1.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[1].discountedAmount.centAmount);
        });

        it('cart - gift entry', () => {
            let mappedCart = cartMapper.mapCart(sampleCartWithGiftEntry, args);
            assert.isDefined(mappedCart.entries);
            assert.strictEqual(mappedCart.entries[0].type, 'REGULAR');
            assert.strictEqual(mappedCart.entries[1].type, 'PROMOTION');
        });

        it('cart - invalid cart id ', () => {
            delete cartData.body.id;
            assert.throws(() => cartMapper.mapCart(cartData, args), MissingProperty);
        });

        it('cart - invalid CT cart ', () => {
            cartData = undefined;
            assert.throws(() => cartMapper.mapCart(cartData, args), MissingProperty);
        });

        it('cart - invalid CT cart body', () => {
            delete cartData.body;
            assert.throws(() => cartMapper.mapCart(cartData, args), MissingProperty);
        });

        it('cart - success shipping tax info', () => {
            let mappedCart = cartMapper.mapCart(sampleCartWithTax, args);

            assert.isDefined(mappedCart.shippingInfo);
            assert.isDefined(mappedCart.taxIncludedInPrices);
            let ctShippingInfoTaxedPrice = sampleCartWithTax.body.shippingInfo.taxedPrice;
            let ctShippingInfoTaxRate = sampleCartWithTax.body.shippingInfo.taxRate;

            assert.strictEqual(mappedCart.shippingInfo.taxInfo.value.amount, ctShippingInfoTaxedPrice.totalGross.centAmount - ctShippingInfoTaxedPrice.totalNet.centAmount);
            mappedCart.shippingInfo.taxInfo.portions.forEach(cifTaxPortion => {
                assert.strictEqual(cifTaxPortion.name, ctShippingInfoTaxRate.name);
                assert.strictEqual(cifTaxPortion.value.amount, ctShippingInfoTaxedPrice.totalGross.centAmount - ctShippingInfoTaxedPrice.totalNet.centAmount);
            });

            assert.strictEqual(mappedCart.netTotalPrice.amount, sampleCartWithTax.body.taxedPrice.totalNet.centAmount);
            assert.strictEqual(mappedCart.netTotalPrice.currency, sampleCartWithTax.body.taxedPrice.totalNet.currencyCode);
            assert.strictEqual(mappedCart.grossTotalPrice.amount, sampleCartWithTax.body.taxedPrice.totalGross.centAmount);
            assert.strictEqual(mappedCart.grossTotalPrice.currency, sampleCartWithTax.body.taxedPrice.totalGross.currencyCode);
            
            let shippingInfoPrice = mappedCart.shippingInfo.discountedPrice ?
                    mappedCart.shippingInfo.discountedPrice.amount :
                    mappedCart.shippingInfo.price.amount;
            let calculatedProductPrice = mappedCart.grossTotalPrice.amount - shippingInfoPrice;
            assert.strictEqual(mappedCart.productTotalPrice.amount, calculatedProductPrice);
            assert.strictEqual(mappedCart.productTotalPrice.currency, sampleCartWithTax.body.totalPrice.currencyCode);
        });

        it('cart - success cart entries tax info', () => {
            let mappedCart = cartMapper.mapCart(sampleCartWithTax, args);

            assert.isDefined(mappedCart.entries);
            assert.isDefined(mappedCart.taxIncludedInPrices);
            assert.strictEqual(mappedCart.taxIncludedInPrices, sampleCartWithTax.body.lineItems[0].taxRate.includedInPrice);
            let ctCartEntryTaxedPrice;
            let ctCartEntryTaxRate;

            mappedCart.entries.forEach((cartEntry, index) => {
                ctCartEntryTaxedPrice = sampleCartWithTax.body.lineItems[index].taxedPrice;
                ctCartEntryTaxRate = sampleCartWithTax.body.lineItems[index].taxRate;
                assert.isDefined(cartEntry.taxInfo);
                assert.strictEqual(cartEntry.taxInfo.value.amount, ctCartEntryTaxedPrice.totalGross.centAmount - ctCartEntryTaxedPrice.totalNet.centAmount);
                cartEntry.taxInfo.portions.forEach(cifTaxPortion => {
                    assert.strictEqual(cifTaxPortion.name, ctCartEntryTaxRate.name);
                    assert.strictEqual(cifTaxPortion.value.amount, ctCartEntryTaxedPrice.totalGross.centAmount - ctCartEntryTaxedPrice.totalNet.centAmount);
                });
            });

        });

        it('cart - success cart summary tax info', () => {
            let mappedCart = cartMapper.mapCart(sampleCartWithTax, args);

            assert.isDefined(mappedCart.taxInfo);
            assert.isDefined(mappedCart.taxIncludedInPrices);
            let ctTaxedPrice = sampleCartWithTax.body.taxedPrice;
            assert.strictEqual(mappedCart.taxInfo.value.amount, ctTaxedPrice.totalGross.centAmount - ctTaxedPrice.totalNet.centAmount);

            let ctCartTaxPortion;
            mappedCart.taxInfo.portions.forEach( (cifTaxPortion, index) => {
                ctCartTaxPortion = sampleCartWithTax.body.taxedPrice.portions[index];
                assert.strictEqual(cifTaxPortion.name, ctCartTaxPortion.name);
                assert.strictEqual(cifTaxPortion.value.amount, ctCartTaxPortion.amount.centAmount);
            });
        });

        it('cart - success cart tax info not defined', () => {
            let mappedCart = cartMapper.mapCart(sampleSimpleCart, args);

            assert.isUndefined(mappedCart.taxInfo);
            assert.isUndefined(mappedCart.taxIncludedInPrices);
            assert.isUndefined(mappedCart.shippingInfo);
            mappedCart.entries.forEach(cartEntry => {
                assert.isUndefined(cartEntry.taxInfo);
            });

        });

        it('maps a cart with coupon codes', () => {
            let mappedCart = cartMapper.mapCart(sampleCartWithCoupon, args);

            assert.isDefined(mappedCart.coupons);
            assert.equal(mappedCart.coupons.length, 1);
        });

    });
});

/**
 * @param {Address} mappedCartAddress
 * @param {Address} cartDataAddress
 */
function assertEqualAddress(mappedCartAddress, cartDataAddress) {
    if (cartDataAddress.id) {
        assert.strictEqual(mappedCartAddress.id, cartDataAddress.id);
    } else {
        assert.isDefined(mappedCartAddress.id);
    }
    assert.strictEqual(mappedCartAddress.title, cartDataAddress.title);
    assert.strictEqual(mappedCartAddress.salutation, cartDataAddress.salutation);
    assert.strictEqual(mappedCartAddress.firstName, cartDataAddress.firstName);
    assert.strictEqual(mappedCartAddress.lastName, cartDataAddress.lastName);
    assert.strictEqual(mappedCartAddress.streetName, cartDataAddress.streetName);
    assert.strictEqual(mappedCartAddress.streetNumber, cartDataAddress.streetNumber);
    assert.strictEqual(mappedCartAddress.additionalStreetInfo,
                       cartDataAddress.additionalStreetInfo);
    assert.strictEqual(mappedCartAddress.postalCode, cartDataAddress.postalCode);
    assert.strictEqual(mappedCartAddress.city, cartDataAddress.city);
    assert.strictEqual(mappedCartAddress.region, cartDataAddress.region);
    assert.strictEqual(mappedCartAddress.country, cartDataAddress.country);
    assert.strictEqual(mappedCartAddress.organizationName, cartDataAddress.company);
    assert.strictEqual(mappedCartAddress.department, cartDataAddress.department);
    assert.strictEqual(mappedCartAddress.phone, cartDataAddress.phone);
    assert.strictEqual(mappedCartAddress.mobile, cartDataAddress.mobile);
    assert.strictEqual(mappedCartAddress.email, cartDataAddress.email);
    assert.strictEqual(mappedCartAddress.fax, cartDataAddress.fax);
    assert.strictEqual(mappedCartAddress.additionalAddressInfo,
                       cartDataAddress.additionalAddressInfo);
}
