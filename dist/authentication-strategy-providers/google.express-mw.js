"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauth2ExpressMiddleware = void 0;
const tslib_1 = require("tslib");
const passport = require('passport');
const core_1 = require("@loopback/core");
const passport_google_oauth2_1 = require("passport-google-oauth2");
let GoogleOauth2ExpressMiddleware = class GoogleOauth2ExpressMiddleware {
    constructor(strategy) {
        this.strategy = strategy;
        passport.use(this.strategy);
    }
    value() {
        return passport.authenticate('google');
    }
};
GoogleOauth2ExpressMiddleware = tslib_1.__decorate([
    core_1.bind.provider({ scope: core_1.BindingScope.SINGLETON }),
    tslib_1.__param(0, core_1.inject('googleStrategy')),
    tslib_1.__metadata("design:paramtypes", [passport_google_oauth2_1.Strategy])
], GoogleOauth2ExpressMiddleware);
exports.GoogleOauth2ExpressMiddleware = GoogleOauth2ExpressMiddleware;
//# sourceMappingURL=google.express-mw.js.map