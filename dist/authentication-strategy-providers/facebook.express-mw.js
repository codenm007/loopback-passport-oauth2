"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOauth2ExpressMiddleware = void 0;
const tslib_1 = require("tslib");
const passport = require('passport');
const core_1 = require("@loopback/core");
const passport_facebook_1 = require("passport-facebook");
let FacebookOauth2ExpressMiddleware = class FacebookOauth2ExpressMiddleware {
    constructor(facebookStrategy) {
        this.facebookStrategy = facebookStrategy;
        passport.use(this.facebookStrategy);
    }
    value() {
        return passport.authenticate('facebook');
    }
};
FacebookOauth2ExpressMiddleware = tslib_1.__decorate([
    core_1.bind.provider({ scope: core_1.BindingScope.SINGLETON }),
    tslib_1.__param(0, core_1.inject('facebookStrategy')),
    tslib_1.__metadata("design:paramtypes", [passport_facebook_1.Strategy])
], FacebookOauth2ExpressMiddleware);
exports.FacebookOauth2ExpressMiddleware = FacebookOauth2ExpressMiddleware;
//# sourceMappingURL=facebook.express-mw.js.map