"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
module.exports = {
    model: user_model_1.User,
    pattern: 'CrudRest',
    dataSource: 'db',
    basePath: '/users',
};
//# sourceMappingURL=user.rest-config.js.map