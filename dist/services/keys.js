"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceBindings = void 0;
const core_1 = require("@loopback/core");
var UserServiceBindings;
(function (UserServiceBindings) {
    UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE = core_1.BindingKey.create('services.passport.identity');
})(UserServiceBindings = exports.UserServiceBindings || (exports.UserServiceBindings = {}));
//# sourceMappingURL=keys.js.map