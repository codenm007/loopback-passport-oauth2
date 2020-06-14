"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuth2InterceptExpressMiddleware = void 0;
const core_1 = require("@loopback/core");
/**
 *  Name: OAuth2InterceptExpressMiddleware
 *  Type: DECORATOR
 *
 *  This method uses the @intercept decorator to intercept incoming requests with a series of passport strategies.
 *  It composes an middleware interceptor chain with the following interceptor keys:
 *      'passport-init-mw',
 *      'passport-session-mw',
 *      'passport-facebook',
 *      'passport-google',
 *      'passport-oauth2'
 */
function oAuth2InterceptExpressMiddleware() {
    return core_1.intercept(core_1.composeInterceptors('passport-init-mw', 'passport-session-mw', 'passport-facebook', 'passport-oauth2', 'passport-google', 'set-session-user'));
}
exports.oAuth2InterceptExpressMiddleware = oAuth2InterceptExpressMiddleware;
//# sourceMappingURL=types.js.map