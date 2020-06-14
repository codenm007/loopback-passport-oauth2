"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginController = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const repository_1 = require("@loopback/repository");
const security_1 = require("@loopback/security");
const authentication_1 = require("@loopback/authentication");
const user_credentials_repository_1 = require("../repositories/user-credentials.repository");
const user_identity_repository_1 = require("../repositories/user-identity.repository");
const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
let UserLoginController = class UserLoginController {
    constructor(userRepository, userCredentialsRepository, userIdentityRepository) {
        this.userRepository = userRepository;
        this.userCredentialsRepository = userCredentialsRepository;
        this.userIdentityRepository = userIdentityRepository;
    }
    async signup(credentials, response) {
        let userCredentials;
        try {
            userCredentials = await this.userCredentialsRepository.findById(credentials.email);
        }
        catch (err) {
            if (err.code !== 'ENTITY_NOT_FOUND') {
                throw err;
            }
        }
        if (!userCredentials) {
            const user = await this.userRepository.create({
                email: credentials.email,
                username: credentials.email,
                name: credentials.name,
            });
            userCredentials = await this.userCredentialsRepository.create({
                id: credentials.email,
                password: credentials.password,
                userId: user.id,
            });
            response.redirect('/login');
            return response;
        }
        else {
            /**
             * The express app that routed the /signup call to LB App, will handle the error event.
             */
            response.emit('User Exists', credentials.email + ' is already registered');
            return response;
        }
    }
    async login(credentials, user, request, response) {
        const profile = {
            ...user.profile,
        };
        request.session.user = profile;
        response.redirect('/auth/account');
        return response;
    }
    /**
     * TODO: enable roles and authorization, add admin role authorization to this endpoint
     */
    async clear() {
        await this.userCredentialsRepository.deleteAll();
        await this.userIdentityRepository.deleteAll();
        await this.userRepository.deleteAll();
    }
    async getExternalProfiles(profile) {
        const user = await this.userRepository.findById(parseInt(profile[security_1.securityId]), {
            include: [
                {
                    relation: 'profiles',
                },
            ],
        });
        return user.profiles;
    }
};
tslib_1.__decorate([
    rest_1.post('/signup'),
    tslib_1.__param(0, rest_1.requestBody({
        description: 'signup user locally',
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: CredentialsSchema },
        },
    })),
    tslib_1.__param(1, context_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoginController.prototype, "signup", null);
tslib_1.__decorate([
    authentication_1.authenticate('local'),
    rest_1.post('/login'),
    tslib_1.__param(0, rest_1.requestBody({
        description: 'login to create a user session',
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: CredentialsSchema },
        },
    })),
    tslib_1.__param(1, context_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(2, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(3, context_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoginController.prototype, "login", null);
tslib_1.__decorate([
    authentication_1.authenticate('basic'),
    rest_1.del('/clear'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoginController.prototype, "clear", null);
tslib_1.__decorate([
    authentication_1.authenticate('basic'),
    rest_1.get('/profiles'),
    tslib_1.__param(0, context_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoginController.prototype, "getExternalProfiles", null);
UserLoginController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(user_credentials_repository_1.UserCredentialsRepository)),
    tslib_1.__param(2, repository_1.repository(user_identity_repository_1.UserIdentityRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        user_credentials_repository_1.UserCredentialsRepository,
        user_identity_repository_1.UserIdentityRepository])
], UserLoginController);
exports.UserLoginController = UserLoginController;
//# sourceMappingURL=user.controller.js.map