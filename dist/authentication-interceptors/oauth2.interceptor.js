"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomOauth2Interceptor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
let CustomOauth2Interceptor = class CustomOauth2Interceptor {
    constructor(oauth2Strategy) {
        this.oauth2Strategy = oauth2Strategy;
    }
    value() {
        return async (invocationCtx, next) => {
            const requestCtx = invocationCtx.getSync(rest_1.RestBindings.Http.CONTEXT);
            const request = requestCtx.request;
            if (request.query['oauth2-provider-name'] === 'oauth2') {
                return rest_1.toInterceptor(this.oauth2Strategy)(invocationCtx, next);
            }
            return next();
        };
    }
};
CustomOauth2Interceptor = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('oauth2StrategyMiddleware')),
    tslib_1.__metadata("design:paramtypes", [Function])
], CustomOauth2Interceptor);
exports.CustomOauth2Interceptor = CustomOauth2Interceptor;
//# sourceMappingURL=oauth2.interceptor.js.map