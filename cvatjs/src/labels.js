/*
* Copyright (C) 2018 Intel Corporation
* SPDX-License-Identifier: MIT
*/

(() => {
    /**
        * Class representing an attribute
        * @memberof module:API.cvat.classes
        * @hideconstructor
    */
    class Attribute {
        constructor(initialData) {
            const data = {
                id: undefined,
                default_value: undefined,
                input_type: undefined,
                mutable: undefined,
                name: undefined,
                values: undefined,
            };

            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    if (Object.prototype.hasOwnProperty.call(initialData, key)) {
                        if (Array.isArray(initialData[key])) {
                            data[key] = [...initialData[key]];
                        } else {
                            data[key] = initialData[key];
                        }
                    }
                }
            }

            if (!Object.values(window.cvat.enums.AttributeType).includes(data.input_type)) {
                throw new window.cvat.exceptions.ArgumentError(
                    `Got invalid attribute type ${data.input_type}`,
                );
            }

            Object.defineProperties(this, Object.freeze({
                /**
                    * @name id
                    * @type {integer}
                    * @memberof module:API.cvat.classes.Attribute
                    * @readonly
                    * @instance
                */
                id: {
                    get: () => data.id,
                },
                /**
                    * @name defaultValue
                    * @type {(string|integer|boolean)}
                    * @memberof module:API.cvat.classes.Attribute
                    * @readonly
                    * @instance
                */
                defaultValue: {
                    get: () => data.default_value,
                },
                /**
                    * @name inputType
                    * @type {module:API.cvat.enums.AttributeType}
                    * @memberof module:API.cvat.classes.Attribute
                    * @readonly
                    * @instance
                */
                inputType: {
                    get: () => data.input_type,
                },
                /**
                    * @name mutable
                    * @type {boolean}
                    * @memberof module:API.cvat.classes.Attribute
                    * @readonly
                    * @instance
                */
                mutable: {
                    get: () => data.mutable,
                },
                /**
                    * @name name
                    * @type {string}
                    * @memberof module:API.cvat.classes.Attribute
                    * @readonly
                    * @instance
                */
                name: {
                    get: () => data.name,
                },
                /**
                    * @name values
                    * @type {(string[]|integer[]|boolean[])}
                    * @memberof module:API.cvat.classes.Attribute
                    * @readonly
                    * @instance
                */
                values: {
                    get: () => [...data.values],
                },
            }));
        }
    }

    /**
        * Class representing a label
        * @memberof module:API.cvat.classes
        * @hideconstructor
    */
    class Label {
        constructor(initialData) {
            const data = {
                id: undefined,
                name: undefined,
            };

            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    if (Object.prototype.hasOwnProperty.call(initialData, key)) {
                        data[key] = initialData[key];
                    }
                }
            }

            data.attributes = [];

            if (Object.prototype.hasOwnProperty.call(initialData, 'attributes')
                && Array.isArray(initialData.attributes)) {
                for (const attrData of initialData.attributes) {
                    data.attributes.push(new window.cvat.classes.Attribute(attrData));
                }
            }

            Object.defineProperties(this, Object.freeze({
                /**
                    * @name id
                    * @type {integer}
                    * @memberof module:API.cvat.classes.Label
                    * @readonly
                    * @instance
                */
                id: {
                    get: () => data.id,
                },
                /**
                    * @name name
                    * @type {string}
                    * @memberof module:API.cvat.classes.Label
                    * @readonly
                    * @instance
                */
                name: {
                    get: () => data.name,
                },
                /**
                    * @name attributes
                    * @type {module:API.cvat.classes.Attribute[]}
                    * @memberof module:API.cvat.classes.Label
                    * @readonly
                    * @instance
                */
                attributes: {
                    get: () => [...data.attributes],
                },
            }));
        }
    }

    module.exports = {
        Attribute,
        Label,
    };
})();
