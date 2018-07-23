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
const LanguageParser = require('../../src/common/LanguageParser');


describe('commercetools LanguageParser', () => {

    describe('Unit tests', () => {

        it('picks a value for a localized string', () => {
            let args = {
                __ow_headers: {
                    'accept-language': 'de-DE'
                }
            };
            let localizedString = {
                de: "Blume",
                fr: "Fleur"
            };
            let languageParser = new LanguageParser(args);
            assert.equal(languageParser.pickLanguage(localizedString), "Blume");
        });

        it('returns undefined for an empty localized string', () => {
            let args = {
                __ow_headers: {
                    'accept-language': 'de-DE'
                }
            };
            let languageParser = new LanguageParser(args);
            assert.isUndefined(languageParser.pickLanguage({}));
        });

        it('returns undefined for an undefined localized string', () => {
            let args = {
                __ow_headers: {
                    'accept-language': 'de-DE'
                }
            };
            let languageParser = new LanguageParser(args);
            assert.isUndefined(languageParser.pickLanguage(undefined));
        });

        it('returns the language with the highest quality', () => {
            let args = {
                __ow_headers: {
                    'accept-language': 'en-US;q=0.9,fr-FR;q=0.7,de-DE;q=0.8'
                }
            };
            let languageParser = new LanguageParser(args);
            assert.equal(languageParser.getFirstLanguage(), "en");
        });

        it('returns undefined for an empty accept-language string', () => {
            let args = {
                __ow_headers: {
                    'accept-language': ''
                }
            };
            let languageParser = new LanguageParser(args);
            assert.isUndefined(languageParser.getFirstLanguage());
        });

    });
});
