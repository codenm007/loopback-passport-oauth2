"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomOauth2ExpressMiddleware = void 0;
const tslib_1 = require("tslib");
const passport = require('passport');
const core_1 = require("@loopback/core");
const passport_oauth2_1 = require("passport-oauth2");
let CustomOauth2ExpressMiddleware = class CustomOauth2ExpressMiddleware {
    constructor(oauth2Strategy) {
        this.oauth2Strategy = oauth2Strategy;
        passport.use(this.oauth2Strategy);
    }
    value() {
        return passport.authenticate('oauth2');
    }
};
CustomOauth2ExpressMiddleware = tslib_1.__decorate([
    core_1.bind.provider({ scope: core_1.BindingScope.SINGLETON }),
    tslib_1.__param(0, core_1.inject('oauth2Strategy')),
    tslib_1.__metadata("design:paramtypes", [passport_oauth2_1.Strategy])
], CustomOauth2ExpressMiddleware);
exports.CustomOauth2ExpressMiddleware = CustomOauth2ExpressMiddleware;
//# sourceMappingURL=oauth2.express-mw.js.map