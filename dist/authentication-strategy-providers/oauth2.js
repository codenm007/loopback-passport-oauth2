"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomOauth2 = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const services_1 = require("../services");
const passport_oauth2_1 = require("passport-oauth2");
const types_1 = require("../authentication-strategies/types");
let CustomOauth2 = class CustomOauth2 {
    constructor(oauth2Options, profileFn, userService) {
        this.oauth2Options = oauth2Options;
        this.profileFn = profileFn;
        this.userService = userService;
        if (profileFn) {
            passport_oauth2_1.Strategy.prototype.userProfile = profileFn;
        }
        this.strategy = new passport_oauth2_1.Strategy(this.oauth2Options, types_1.verifyFunctionFactory(this.userService));
    }
    value() {
        return this.strategy;
    }
};
CustomOauth2 = tslib_1.__decorate([
    core_1.bind.provider({ scope: core_1.BindingScope.SINGLETON }),
    tslib_1.__param(0, core_1.inject('customOAuth2Options')),
    tslib_1.__param(1, core_1.inject('authentication.oauth2.profile.function', { optional: true })),
    tslib_1.__param(2, core_1.inject(services_1.UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [Object, Function, Object])
], CustomOauth2);
exports.CustomOauth2 = CustomOauth2;
//# sourceMappingURL=oauth2.js.map