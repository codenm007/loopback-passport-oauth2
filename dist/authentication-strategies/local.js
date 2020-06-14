"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuthStrategy = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_passport_1 = require("@loopback/authentication-passport");
const security_1 = require("@loopback/security");
const context_1 = require("@loopback/context");
const passport_local_1 = require("passport-local");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
let LocalAuthStrategy = class LocalAuthStrategy {
    /**
     * create a local passport strategy
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.name = 'local';
        /**
         * create a local passport strategy with verify function to validate credentials
         */
        this.passportstrategy = new passport_local_1.Strategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        }, this.verify.bind(this));
        /**
         * wrap the passport strategy instance with an adapter to plugin to LoopBack authentication
         */
        this.strategy = new authentication_passport_1.StrategyAdapter(this.passportstrategy, this.name, this.mapProfile.bind(this));
    }
    /**
     * authenticate a request
     * @param request
     */
    async authenticate(request) {
        return this.strategy.authenticate(request);
    }
    /**
     * authenticate user with provided username and password
     *
     * @param username
     * @param password
     * @param done
     *
     * @returns User model
     */
    verify(username, password, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done) {
        this.userRepository
            .find({
            where: {
                email: username,
            },
            include: [
                {
                    relation: 'profiles',
                },
                {
                    relation: 'credentials',
                },
            ],
        })
            .then((users) => {
            const AUTH_FAILED_MESSAGE = 'User Name / Password not matching';
            /**
             * Passport-local strategy fails authentication with the third argument,
             * the first argument assumes an error in the authenticating process.
             */
            if (!users || !users.length) {
                return done(null, null, { message: AUTH_FAILED_MESSAGE });
            }
            const user = users[0];
            if (!user.credentials || user.credentials.password !== password) {
                return done(null, null, { message: AUTH_FAILED_MESSAGE });
            }
            // Authentication passed, return user profile
            done(null, user);
        })
            .catch(err => {
            /**
             * Error occurred in authenticating process.
             * Does not necessarily mean an unauthorized user.
             */
            done(err);
        });
    }
    /**
     * maps returned User model from verify function to UserProfile
     *
     * @param user
     */
    mapProfile(user) {
        const userProfile = {
            [security_1.securityId]: '' + user.id,
            profile: {
                ...user,
            },
        };
        return userProfile;
    }
};
LocalAuthStrategy = tslib_1.__decorate([
    context_1.bind(authentication_1.asAuthStrategy),
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], LocalAuthStrategy);
exports.LocalAuthStrategy = LocalAuthStrategy;
//# sourceMappingURL=local.js.map