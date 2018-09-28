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
 * This file defines how to handle CIF graphql arguments and translate them into commercetools graphql arguments.
 * The 'args' object takes the cif argument names as properties with the corresponding handler functions as values.
 * The 'obligatoryArgs' object includes the fields on which you want to enforce some argument treatments as properties
 * and an array with the names of the argument handler functions (as defined in 'args' object) which are to be executed
 * in order if not present in the field's argument object as corresponding values.
 */

//const GraphQLError = require('graphql/error').GraphQLError;

const filterFields = ["sku", "name", "id", "categories.id"];
const sortFields = ["sku", "name", "id", "createdAt", "lastModifiedAt"];
/**
 * @private
 */
function _translateFilterFieldName(field) {
    if (field === "variants.sku") {
        return "skus";
    } else if (filterFields.includes(field)) {
        return field;
    }
    return null;
}

function _translateSortFieldName(field) {
    if (field === "id") {
        return field;
    } else if (sortFields.includes(field)) {
        return field;
    }
    return null;
}

const args = {
    limit: function (args) {
        args.limit = Number(args.limit);
    },

    offset: function(args) {
        args.offset = Number(args.offset);
    },

    text: function (args) {
        args.where = 'masterData(current(slug(en="' + args.text + '") or description(en="' + args.text + '") or name(en="' + args.text + '")))';
        delete args.text;
    },

    textOrFilter: function (args) {
        let where = args.where;
        let skus = args.skus;
        if (!(where || skus) || (skus && skus.length === 0)) {
            throw new Error("The request didn't include any valid search filter or text argument");
        }
    },

    sort: function (args) {
        let sortArgs = Array.isArray(args.sort) ? args.sort : [args.sort];
        let sortFields = [];
        console.log("sort args")
        sortArgs.forEach((sortArg) => {
            // Get direction
            let direction = 'asc';
            let split = sortArg.split('.');
            if (split.slice(-1)[0] == 'desc') {
                direction = 'desc';
            }
            let str;
            // Translate field names
            let field = _translateSortFieldName(split[0]);
            if (field === "id" || field === "createdAt" || field === "lastModifiedAt") {
                str = field + " " + direction;
            } else if (field) {
                field = field === "sku" ? "slug" : field;
                str = "masterData.current." + field + ".en " + direction;
            } else {
                throw Error("Invalid sort input " + sortArg);
            }
            sortFields.push(str);
        });

        args.sort = sortFields;

    },

    filter: function (args) {
        let where = args.where ? args.where + ' and ' : "";
        let filterArgs = Array.isArray(args.filter) ? args.filter : [args.filter];
        let skus = [];

        filterArgs.forEach((filterArg) => {
            // Translate field names

            let split = filterArg.split(':');
            let field = _translateFilterFieldName(split[0].trim());
            // Parse value
            let value;
            let values;
            let str;
            if (split.length == 2) {
                value = split[1];
            }
            if (field === "skus" && value) {
                values = value.split(',');
                values.forEach(v => {
                    skus.push(v);
                });
            } else if (field === "categories.id" && value) {
                where += where ? ' and ' : "";
                values = value.split(',');
                str = 'masterData(current(categories(id';
                if (values.length > 1) {
                    str += ' in (';
                    let n = values.length - 1;
                    values.forEach((v, i) => {
                        str += '"' + v.trim() + '"' + (i !== n ? ', ' : ")");
                    });
                } else {
                    str += '="' + values[0] + '"';
                }
                str += ')))';
                where += str;
            } else if (field && value) {
                if (field === "sku") {
                    field = "slug";
                }
                where += where ? ' and ' : "";
                values = value.split(',');
                str = 'masterData(current(' + field + '(en';
                if (values.length > 1) {
                    str += ' in (';
                    let n = values.length - 1;
                    values.forEach((v, i) => {
                        str += '"' + v.trim() + '"' + (i !== n ? ', ' : ")");
                    });
                } else {
                    str += '="' + values[0] + '"';
                }
                str += ')))';
                where += str;
            } else {
                throw Error("Invalid filter input " + filterArg);
            }
        });
        delete args.filter;
        if (where) {
            args.where = where;
        }
        if (skus.length > 0) {
            args.skus = skus;
        }
    }
};

let forceFields = {
    searchProducts: ["textOrFilter"]
};

module.exports = { args, forceFields };