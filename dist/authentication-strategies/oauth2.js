"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth2AuthStrategy = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_passport_1 = require("@loopback/authentication-passport");
const passport_oauth2_1 = require("passport-oauth2");
const core_1 = require("@loopback/core");
const types_1 = require("./types");
let Oauth2AuthStrategy = class Oauth2AuthStrategy {
    /**
     * create an oauth2 strategy
     */
    constructor(
    /**
     * enable extensions for provider specific oauth2 implementations
     * reroute to the specific extension based on given provider name
     */
    getStrategies, passportstrategy) {
        this.getStrategies = getStrategies;
        this.passportstrategy = passportstrategy;
        this.name = 'oauth2';
        this.strategy = new authentication_passport_1.StrategyAdapter(this.passportstrategy, this.name, types_1.mapProfile.bind(this));
    }
    /**
     * authenticate a request
     * @param request
     */
    async authenticate(request) {
        if (request.query['oauth2-provider-name'] &&
            request.query['oauth2-provider-name'] !== 'oauth2') {
            /**
             * if provider name is given then reroute to the provider extension
             */
            const providerName = request.query['oauth2-provider-name'];
            const strategies = await this.getStrategies();
            const strategy = strategies.find((s) => s.name === 'oauth2-' + providerName);
            if (!strategy)
                throw new Error('provider not found');
            return strategy.authenticate(request);
        }
        else {
            /**
             * provider not given, use passport-oauth2 for custom provider implementation
             */
            return this.strategy.authenticate(request);
        }
    }
};
Oauth2AuthStrategy = tslib_1.__decorate([
    core_1.bind(authentication_1.asAuthStrategy),
    tslib_1.__param(0, core_1.extensions(types_1.PassportAuthenticationBindings.OAUTH2_STRATEGY)),
    tslib_1.__param(1, core_1.inject('oauth2Strategy')),
    tslib_1.__metadata("design:paramtypes", [Function, passport_oauth2_1.Strategy])
], Oauth2AuthStrategy);
exports.Oauth2AuthStrategy = Oauth2AuthStrategy;
//# sourceMappingURL=oauth2.js.map