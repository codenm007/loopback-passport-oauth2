"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth2Controller = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const security_1 = require("@loopback/security");
const types_1 = require("../authentication-interceptors/types");
/**
 * Login controller for third party oauth provider
 *
 * This controller demonstrates using passport strategies both as express middleware and as an independent strategy
 *
 * The method loginToThirdParty uses the @authenticate decorator to plugin passport strategies independently
 * The method thirdPartyCallBack uses the passport strategies as express middleware
 */
class Oauth2Controller {
    constructor() { }
    /**
     * This method uses the @authenticate decorator to plugin passport strategies independently
     *
     * Endpoint: '/auth/thirdparty/{provider}'
     *          an endpoint for api clients to login via a third party app, redirects to third party app
     */
    loginToThirdParty(provider, redirectUrl, status, response) {
        response.statusCode = status || 302;
        response.setHeader('Location', redirectUrl);
        response.end();
        return response;
    }
    /**
     * This method uses the passport strategies as express middleware
     *
     * Endpoint: '/auth/thirdparty/{provider}/callback'
     *          an endpoint which serves as a oauth2 callback for the thirdparty app
     *          this endpoint sets the user profile in the session
     */
    async thirdPartyCallBack(provider, user, request, response) {
        const profile = {
            ...user.profile,
        };
        request.session.user = profile;
        response.redirect('/auth/account');
        return response;
    }
}
tslib_1.__decorate([
    authentication_1.authenticate('oauth2'),
    rest_1.get('/auth/thirdparty/{provider}'),
    tslib_1.__param(0, rest_1.param.path.string('provider')),
    tslib_1.__param(1, core_1.inject(authentication_1.AuthenticationBindings.AUTHENTICATION_REDIRECT_URL)),
    tslib_1.__param(2, core_1.inject(authentication_1.AuthenticationBindings.AUTHENTICATION_REDIRECT_STATUS)),
    tslib_1.__param(3, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Oauth2Controller.prototype, "loginToThirdParty", null);
tslib_1.__decorate([
    types_1.oAuth2InterceptExpressMiddleware(),
    rest_1.get('/auth/thirdparty/{provider}/callback'),
    tslib_1.__param(0, rest_1.param.path.string('provider')),
    tslib_1.__param(1, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(3, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Oauth2Controller.prototype, "thirdPartyCallBack", null);
exports.Oauth2Controller = Oauth2Controller;
//# sourceMappingURL=oauth2.controller.js.map