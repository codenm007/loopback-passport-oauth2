"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceBookOauth2Authorization = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_passport_1 = require("@loopback/authentication-passport");
const passport_facebook_1 = require("passport-facebook");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const types_1 = require("./types");
const types_2 = require("./types");
let FaceBookOauth2Authorization = class FaceBookOauth2Authorization {
    /**
     * create an oauth2 strategy for facebook
     */
    constructor(passportStrategy) {
        this.passportStrategy = passportStrategy;
        this.name = 'oauth2-facebook';
        this.strategy = new authentication_passport_1.StrategyAdapter(this.passportStrategy, this.name, types_2.mapProfile.bind(this));
    }
    /**
     * authenticate a request
     * @param request
     */
    async authenticate(request) {
        return this.strategy.authenticate(request);
    }
};
FaceBookOauth2Authorization = tslib_1.__decorate([
    context_1.bind(authentication_1.asAuthStrategy, core_1.extensionFor(types_1.PassportAuthenticationBindings.OAUTH2_STRATEGY)),
    tslib_1.__param(0, context_1.inject('facebookStrategy')),
    tslib_1.__metadata("design:paramtypes", [passport_facebook_1.Strategy])
], FaceBookOauth2Authorization);
exports.FaceBookOauth2Authorization = FaceBookOauth2Authorization;
//# sourceMappingURL=facebook.js.map