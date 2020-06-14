"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject, authenticateRequest) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const route = this.findRoute(request);
            // usually authentication is done before proceeding to parse params
            // but in our case we need the path params to know the provider name
            const args = await this.parseParams(request, route);
            // if provider name is available in the request path params, set it in the query
            if (route.pathParams && route.pathParams.provider) {
                request.query['oauth2-provider-name'] = route.pathParams.provider;
            }
            //call authentication action
            await this.authenticateRequest(request);
            // Authentication successful, proceed to invoke controller
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (error) {
            /**
             * Authentication errors for login page are handled by the express app
             */
            if (context.request.path === '/login' &&
                (error.status === 401 || error.name === 'UnauthorizedError')) {
                /**
                 * The express app that routed the /signup call to LB App, will handle the error event.
                 */
                context.response.emit('UnauthorizedError', 'User Authentication Failed');
                return;
            }
            if (error.code === authentication_1.AUTHENTICATION_STRATEGY_NOT_FOUND ||
                error.code === authentication_1.USER_PROFILE_NOT_FOUND) {
                Object.assign(error, { statusCode: 401 /* Unauthorized */ });
            }
            this.reject(context, error);
            return;
        }
    }
};
MySequence = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(SequenceActions.FIND_ROUTE)),
    tslib_1.__param(1, context_1.inject(SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(2, context_1.inject(SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(3, context_1.inject(SequenceActions.SEND)),
    tslib_1.__param(4, context_1.inject(SequenceActions.REJECT)),
    tslib_1.__param(5, context_1.inject(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map