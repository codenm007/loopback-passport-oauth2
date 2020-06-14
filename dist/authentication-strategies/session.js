"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStrategy = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const types_1 = require("./types");
let SessionStrategy = class SessionStrategy {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.name = 'session';
    }
    /**
     * authenticate a request
     * @param request
     */
    async authenticate(request) {
        if (!request.session || !request.session.user) {
            throw new rest_1.HttpErrors.Unauthorized(`Invalid Session`);
        }
        const user = request.session.user;
        if (!user.email || !user.id) {
            throw new rest_1.HttpErrors.Unauthorized(`Invalid user profile`);
        }
        const users = await this.userRepository.find({
            where: {
                email: user.email,
            },
        });
        if (!users || !users.length) {
            throw new rest_1.HttpErrors.Unauthorized(`User not registered`);
        }
        return types_1.mapProfile(request.session.user);
    }
};
SessionStrategy = tslib_1.__decorate([
    context_1.bind(authentication_1.asAuthStrategy),
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], SessionStrategy);
exports.SessionStrategy = SessionStrategy;
//# sourceMappingURL=session.js.map