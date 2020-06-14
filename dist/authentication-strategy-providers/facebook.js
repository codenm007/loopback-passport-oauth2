"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOauth = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const services_1 = require("../services");
const passport_facebook_1 = require("passport-facebook");
const types_1 = require("../authentication-strategies/types");
let FacebookOauth = class FacebookOauth {
    constructor(facebookOptions, userService) {
        this.facebookOptions = facebookOptions;
        this.userService = userService;
        this.strategy = new passport_facebook_1.Strategy(this.facebookOptions, types_1.verifyFunctionFactory(this.userService));
    }
    value() {
        return this.strategy;
    }
};
FacebookOauth = tslib_1.__decorate([
    core_1.bind.provider({ scope: core_1.BindingScope.SINGLETON }),
    tslib_1.__param(0, core_1.inject('facebookOAuth2Options')),
    tslib_1.__param(1, core_1.inject(services_1.UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], FacebookOauth);
exports.FacebookOauth = FacebookOauth;
//# sourceMappingURL=facebook.js.map