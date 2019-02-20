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

const alp = require('accept-language-parser');
const HEADER_ACCEPT_LANGUAGE = require('./constants').HEADER_ACCEPT_LANGUAGE;

/**
 * LanguageParser provides methods to parse HTTP Accept-Language headers.
 */
class LanguageParser {

    /**
     * Constructor
     * 
     * @param {Object} args OpenWhisk action arguments
     */
    constructor(args) {
        // Extract accepted languages from the header and fall back to the default value in case none was sent.
        const languageHeader = args.__ow_headers[HEADER_ACCEPT_LANGUAGE.toLowerCase()] || args.DEFAULT_ACCEPT_LANGUAGE_HEADER;
        this.acceptedLanguage = this.parseAcceptedLanguages(languageHeader);
        this.hasWildcard = this.acceptedLanguage.find(o => o.code == '*') !== undefined;
    }

    /**
     * Parses the contents of the Accept-Language header into a sorted object.
     * 
     * @param {String} header 
     */
    parseAcceptedLanguages(header) {
        return alp.parse(header);
    }

    /**
     * Returns the value of an object whose key matches the highest quality accepted language.
     * 
     * @param {*} attribute 
     */
    pickLanguage(attribute) {
        if (!attribute) {
            return;
        }
        let language = alp.pick(Object.keys(attribute), this.acceptedLanguage, { loose: true });
        let value = language ? attribute[language] : null;
        return value ? value : (this.hasWildcard ? attribute[Object.keys(attribute)[0]] : undefined);
    }

    /**
     * Returns the language code for the language with the highest quality.
     */
    getFirstLanguage() {
        if (!this.acceptedLanguage || this.acceptedLanguage.length == 0) {
            return;
        }
        return this.acceptedLanguage[0].code;
    }

    /**
     * Returns the BCP47 language tag for the language with the highest quality.
     */
    getFirstLanguageTag() {
        if (!this.acceptedLanguage || this.acceptedLanguage.length == 0) {
            return;
        }

        if (this.acceptedLanguage[0].code && this.acceptedLanguage[0].region) {
            return this.acceptedLanguage[0].code + "-" + this.acceptedLanguage[0].region;
        } else if (this.acceptedLanguage[0].code) {
            return this.acceptedLanguage[0].code;
        } else {
            return this.acceptedLanguage[0].region;
        }
    }
}

module.exports = LanguageParser;