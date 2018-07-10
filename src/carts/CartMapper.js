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

const Cart = require('@adobe/commerce-cif-model').Cart;
const CartEntry = require('@adobe/commerce-cif-model').CartEntry;
const Discount = require('@adobe/commerce-cif-model').Discount;
const DiscountType = require('@adobe/commerce-cif-common/model').DiscountType;
const CartEntryType = require('@adobe/commerce-cif-common/model').CartEntryType;
const Address = require('@adobe/commerce-cif-model').Address;
const ShippingInfo = require('@adobe/commerce-cif-model').ShippingInfo;
const MissingPropertyException = require('@adobe/commerce-cif-common/exception').MissingPropertyException;
const PaymentMapper = require('./PaymentMapper');
const CouponMapper = require('./CouponMapper');
const CcifIdentifier = require('@adobe/commerce-cif-commercetools-common/CcifIdentifier');
const Price = require('@adobe/commerce-cif-model').Price;
const TaxInfo = require('@adobe/commerce-cif-model').TaxInfo;
const TaxPortion = require('@adobe/commerce-cif-model').TaxPortion;
const ProductMapper = require('@adobe/commerce-cif-commercetools-product/ProductMapper');

/**
 * Utility class to map commercetools cart objects to CCIF objects. Private marked methods should not be used outside
 * of this class.
 */
class CartMapper {

    static get GIFT_LINE_ITEM() {
        return 'GiftLineItem';
    }

    /**
     * Maps the CommerceTools cart to the CCIF cart representation.
     *
     * @param ctCart            JSON containing cart information as returned by CommerceTools.
     * @returns {Cart}          CCIF Cart representation.
     */
    static mapCart(ctCart) {
        if (!ctCart || !ctCart.body) {
            throw new MissingPropertyException('invalid cart response received from commerce tools');
        }
        if (!ctCart.body.id) {
            throw new MissingPropertyException('id missing for commercetools cart');
        }
        return CartMapper._mapCart(ctCart.body);
    }


    /**
     * @protected
     */
    static _mapCart(ctCart) {
        let cartEntries = [];
        if (ctCart.lineItems && ctCart.lineItems.length > 0) {
            cartEntries = CartMapper._mapCartEntries(ctCart.lineItems);
        }
        const ccifIf = CcifIdentifier.buildCcifIdentifier(ctCart.id, ctCart.version);
        let cart = new Cart(cartEntries, ccifIf);
        cart.discounts = [];
        
        if (ctCart.taxedPrice) {
            cart.netTotalPrice = new Price(ctCart.taxedPrice.totalNet.centAmount, ctCart.taxedPrice.totalNet.currencyCode);
            cart.grossTotalPrice = new Price(ctCart.taxedPrice.totalGross.centAmount, ctCart.taxedPrice.totalGross.currencyCode);
        }
        
        cart.createdDate = ctCart.createdAt;
        cart.lastModifiedDate = ctCart.lastModifiedAt;
        cart.customerId = ctCart.customerId;
        if (ctCart.shippingAddress) {
            cart.shippingAddress = CartMapper._mapAddress(ctCart.shippingAddress);
        }
        if (ctCart.billingAddress) {
            cart.billingAddress = CartMapper._mapAddress(ctCart.billingAddress);
        }
        if (ctCart.discountCodes) {
            cart.coupons = CartMapper._mapCoupons(ctCart.discountCodes);
        }
        //shipping discount is added to the cart discounts.
        if (ctCart.shippingInfo) {
            cart.shippingInfo = CartMapper._mapShippingInfo(ctCart.shippingInfo);
            if (ctCart.shippingInfo.discountedPrice) {
                CartMapper._addCartDiscounts(cart, ctCart.shippingInfo.discountedPrice.includedDiscounts,
                                             DiscountType.SHIPPING);
            }
        }
        if (ctCart.paymentInfo && ctCart.paymentInfo.payments) {
            cart.payment = CartMapper._mapPayments(ctCart.paymentInfo.payments);
        }
        if (ctCart.taxedPrice) {
            cart.cartTaxInfo = CartMapper._mapCartTaxInfo(ctCart.taxedPrice);
            if (ctCart.lineItems && ctCart.lineItems.length > 0) {
                if (ctCart.lineItems[0].taxRate) {
                    cart.taxIncludedInPrices = ctCart.lineItems[0].taxRate.includedInPrice;
                }
            }
        }
        CartMapper._calculateTotalProductPrice(cart, ctCart); // MUST be called after shippingInfo is added to the cart
        return cart;
    }

    /**
     * @private
     */
    static _calculateTotalProductPrice(cart, ctCart) {
        cart.totalProductPrice = new Price(ctCart.totalPrice.centAmount, ctCart.totalPrice.currencyCode);
        if (cart.shippingInfo) {
            if (cart.shippingInfo.discountedPrice) {
                cart.totalProductPrice.centAmount -= cart.shippingInfo.discountedPrice.centAmount;
            } else {
                cart.totalProductPrice.centAmount -= cart.shippingInfo.price.centAmount;
            }
        }
    }

    /**
     * @private
     */
    static _mapCartEntries(lineItems) {
        return lineItems.map(lineItem => {
            const productVariant = ProductMapper.mapProductVariant(lineItem);
            const cartEntry = new CartEntry(lineItem.id, productVariant, lineItem.quantity);
            cartEntry.unitPrice = new Price(lineItem.price.value.centAmount, lineItem.price.value.currencyCode);
            cartEntry.type = (lineItem.lineItemMode ===  CartMapper.GIFT_LINE_ITEM ? CartEntryType.PROMOTION : CartEntryType.REGULAR);
            if (lineItem.discountedPricePerQuantity && lineItem.discountedPricePerQuantity.length > 0) {

                cartEntry.discounts = CartMapper._mapCartEntryDiscounts(lineItem.discountedPricePerQuantity);
                cartEntry.discountedCartEntryPrice =
                    new Price(lineItem.totalPrice.centAmount, lineItem.totalPrice.currencyCode);
            }

            cartEntry.cartEntryPrice =
                new Price(lineItem.price.value.centAmount * lineItem.quantity, lineItem.totalPrice.currencyCode);

            if (lineItem.taxedPrice && lineItem.taxRate) {
                cartEntry.cartEntryTaxInfo = CartMapper._mapItemTaxInfo(lineItem.taxedPrice, lineItem.taxRate);
            }

            return cartEntry;
        });

    }

    /**
     * @param discountedPricePerQuantityArray
     * @return {Discount[]}
     * @private
     */
    static _mapCartEntryDiscounts(discountedPricePerQuantityArray) {
        const map = new Map();

        discountedPricePerQuantityArray.forEach(discountedPricePerQuantity => {
            const quantity = discountedPricePerQuantity.quantity;

            discountedPricePerQuantity.discountedPrice.includedDiscounts.forEach(includedDiscount => {
                let id = includedDiscount.discount.id;
                if (!map.has(id)) {
                    const discount = CartMapper._mapDiscount(includedDiscount, DiscountType.CART_ENTRY);
                    discount.discountedAmount.centAmount = 0;
                    map.set(id, discount);
                }
                map.get(id).discountedAmount.centAmount += includedDiscount.discountedAmount.centAmount * quantity;
            });
        });

        return [...map.values()];
    }

    /**
     * @param includedDiscount Value of included discount from CommerceTools. See
     *     https://dev.commercetools.com/http-api-projects-carts.html#discountedlineitemportion
     * @param {string} type The CCIF type of discount
     * @returns {Discount}
     * @private
     */
    static _mapDiscount(includedDiscount, type) {
        const price = new Price(includedDiscount.discountedAmount.centAmount,
                                includedDiscount.discountedAmount.currencyCode);
        const discount = new Discount(price, includedDiscount.discount.id, type);

        if (includedDiscount.discount.obj) {
            if (includedDiscount.discount.obj.name) {
                discount.name = includedDiscount.discount.obj.name;
            }
            if (includedDiscount.discount.obj.description) {
                discount.message = includedDiscount.discount.obj.description;
            }
        }

        return discount;
    }

    /**
     *
     * @param ctAddress
     * @return {Address}    CCIF Address
     * @private
     */
    static _mapAddress(ctAddress) {
        const address = new Address();
        address.id = ctAddress.id;
        address.title = ctAddress.title;
        address.salutation = ctAddress.salutation;
        address.firstName = ctAddress.firstName;
        address.lastName = ctAddress.lastName;
        address.streetName = ctAddress.streetName;
        address.streetNumber = ctAddress.streetNumber;
        address.additionalStreetInfo = ctAddress.additionalStreetInfo;
        address.postalCode = ctAddress.postalCode;
        address.city = ctAddress.city;
        address.region = ctAddress.region;
        address.country = ctAddress.country;
        address.organizationName = ctAddress.company;
        address.department = ctAddress.department;
        address.phone = ctAddress.phone;
        address.mobile = ctAddress.mobile;
        address.email = ctAddress.email;
        address.fax = ctAddress.fax;
        address.additionalAddressInfo = ctAddress.additionalAddressInfo;
        return address;
    }

    /**
     * Maps array of cart coupon codes to CIF coupons.
     * 
     * @param {string} ctCoupons    Array of JSON representation of CommerceTools coupons..
     * @returns {Array}             returns array of Coupon instances.
     * @private
     */
    static _mapCoupons(ctCoupons) {
        return ctCoupons.map(ctCoupon => {
            return CouponMapper.mapCoupon(ctCoupon.discountCode.obj);
        });
    }

    /**
     *
     * @param ctShippingInfo
     * @return {ShippingInfo} CCIF ShippingInfo
     * @private
     */
    static _mapShippingInfo(ctShippingInfo) {
        let shippingInfo = new ShippingInfo();
        if (ctShippingInfo.shippingMethod) {
            shippingInfo.id = ctShippingInfo.shippingMethod.id;
        }
        shippingInfo.name = ctShippingInfo.shippingMethodName;
        shippingInfo.price = new Price(ctShippingInfo.price.centAmount, ctShippingInfo.price.currencyCode);
        if (ctShippingInfo.discountedPrice) {
            shippingInfo.discountedPrice = new Price(ctShippingInfo.discountedPrice.value.centAmount,
                                                     ctShippingInfo.discountedPrice.value.currencyCode);
        }
        if (ctShippingInfo.taxedPrice && ctShippingInfo.taxRate) {
            shippingInfo.shippingTaxInfo = CartMapper._mapItemTaxInfo(ctShippingInfo.taxedPrice, ctShippingInfo.taxRate);
        }
        return shippingInfo;
    }

    /**
     * Adds discounts(like shipping discounts) to the cart discounts.
     *
     * @param {Cart} cart
     * @param ctDiscounts DiscountedLineItemPortion from CommerceTools response. See
     *     https://dev.commercetools.com/http-api-projects-carts.html#discountedlineitemportion
     * @param {string} discountType
     * @private
     */
    static _addCartDiscounts(cart, ctDiscounts, discountType) {
        cart.discounts.push(...ctDiscounts.map(includedDiscount => {
            return CartMapper._mapDiscount(includedDiscount, discountType);
        }));
    }

    /**
     * Maps the payment received from CT to CCIF Model. If more than one payment is found in the Commerce Tools cart an
     * UnexpectedError is thrown.
     *
     * @param ctPayments
     * @private
     */
    static _mapPayments(ctPayments) {
        if (ctPayments.length > 1) {
            throw new Error(`Unexpected cart payments array size. Found ${ctPayments.length}!`);
        }
        return PaymentMapper._mapPayment(ctPayments[0].obj);

    }

    /**
     * Maps CommerceTools taxed price and rate to Commerce Integration Framework TaxInfo. This mapping applies for cart
     * items like cart entries or shipping info.
     *
     * @param ctTaxedPrice  Commerce Tools taxed price.
     * @param ctTaxRate     Commerce Tools tax rate.
     * @return {TaxInfo}    Commerce Integration Framework tax info.
     * @private
     */
    static _mapItemTaxInfo(ctTaxedPrice, ctTaxRate) {

        let taxInfo = new TaxInfo();
        let taxPortion = new TaxPortion();

        taxPortion.name = {'en': ctTaxRate.name};
        taxPortion.centAmount = ctTaxedPrice.totalGross.centAmount - ctTaxedPrice.totalNet.centAmount;

        taxInfo.totalCentAmount = taxPortion.centAmount;
        taxInfo.taxPortions = [];
        taxInfo.taxPortions.push(taxPortion);

        return taxInfo;
    }

    /**
     * Maps CommerceTools taxed price and tax portion to Commerce Integration Framework TaxInfo. This mapping applies
     * for cart tax summary.
     *
     * @param ctTaxedPrice  Commerce Tools cart taxed price
     * @param ctTaxPortions Commerce Tools cart tax portions
     * @return {TaxInfo}    Commerce Integration Framework tax info.
     * @private
     */
    static _mapCartTaxInfo(ctTaxedPrice) {

        let taxInfo = new TaxInfo();

        taxInfo.taxPortions = [];
        taxInfo.totalCentAmount = ctTaxedPrice.totalGross.centAmount - ctTaxedPrice.totalNet.centAmount;

        if (ctTaxedPrice.taxPortions) {
            taxInfo.taxPortions.push(...ctTaxedPrice.taxPortions.map(ctTaxPortion => {
                let taxPortion = new TaxPortion();
                taxPortion.name = {'en': ctTaxPortion.name};
                taxPortion.centAmount = ctTaxPortion.amount.centAmount;
                return taxPortion;
            }));
        }

        return taxInfo;
    }
}

module.exports = CartMapper;