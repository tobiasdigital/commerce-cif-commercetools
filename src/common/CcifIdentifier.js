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

/**
 * CCIF Identifier that handles Commerce Tools id and version.
 */
class CcifIdentifier {

    static get CCIF_ID_SEP () {
        return '-';
    }

    /**
     * Constructor that builds a ccif identifier based on a ccifIdentifier. Should be used in Commerce Tools client
     * handling specific requests.
     *
     * @param ccifId
     */
    constructor(ccifId) {
        const lio = ccifId.lastIndexOf(CcifIdentifier.CCIF_ID_SEP);
        this.id = ccifId.substring(0, lio);
        this.version = ccifId.substring(lio + 1, ccifId.length);
    }

    /**
     *
     * @return {string} representing Commerce Tools id.
     */
    getCommerceToolsId() {
        return this.id;
    }

    /**
     *
     * @return {Number} representing Commerce Tools version.
     */
    getCommerceToolsVersion() {
        return parseFloat(this.version);
    }

    static buildCcifIdentifier(commerceToolsId, commerceToolsVersion) {
        return commerceToolsId + CcifIdentifier.CCIF_ID_SEP + commerceToolsVersion;
    }

}

module.exports = CcifIdentifier;