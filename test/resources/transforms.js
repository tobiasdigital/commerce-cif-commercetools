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

const aliasFields = {
    searchProducts: {
        results: {
            sku: {},
            variants: {
                attributes: {
                    name: {},
                    id: {},
                    isVariantAxis: {}
                }
            }
        }
    }
};

const moveFields = {
    actualObject: {
        searchProducts: {
            results: {
                name: {},
                description: {},
                categories: {},
                variants: {
                    attributes: {
                        name: {},
                        isVariantAxis: {}
                    }
                },
                sku: {}
            }
        }
    },
    expectedObject: {
        searchProducts: {
            results: {
                masterData: {
                    current: {
                        name: {},
                        description: {},
                        categories: {},
                        variants: {
                            attributes: {
                                attributeDefinition: {
                                    name: {},
                                    isVariantAxis: {}
                                }
                            }
                        },
                        sku: {}
                    }
                }
            }
        }
    }
};

const addFields = {
    actualObject: {
        searchProducts: {
            results: {
                masterVariantId: {},
                variants: {
                    name: {},
                    description: {},
                    available: {},
                    assets: {},
                },
                assets: {
                    url: {}
                },
                prices: {
                    currency: {},
                    amount: {}
                },
                attributes: {},
                categories: {
                    mainParentId: {}
                }
            }
        }
    },
    expectedObject: {
        searchProducts: {
            results: {
                masterData: {
                    current: {
                        masterVariant: {
                            id: {}
                        },
                        images: {},
                        assets: {
                            sources: {
                                uri: {}
                            }
                        },
                        prices: {
                            value: {
                                currencyCode: {},
                                centAmount: {}
                            }
                        },
                        categories: {
                            parent: {
                                id: {}
                            }
                        }
                    }
                },
                id: {},
                name: {},
                description: {},
                createdAt: {}
            }
        }
    }
};

const ignoreFields = {
    searchProducts: {
        facets: {},
        results: {
            categories: {
                mainParentId: {},
                children: {},
                parents: {}
            },
            assets: {},
            masterVariantId: {},
            prices: {},
            attributes: {},
            variants: {
                available: {},
                name: {},
                createdAt: {},
                lastModifiedAt: {},
                description: {},
                categories: {},
                assets: {
                    url: {}
                },
                prices: {
                    amount: {},
                    currency: {}
                }
            }
        }
    }
};

module.exports = { aliasFields, moveFields, addFields, ignoreFields };