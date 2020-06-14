"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicStrategy = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_passport_1 = require("@loopback/authentication-passport");
const context_1 = require("@loopback/context");
const passport_http_1 = require("passport-http");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const types_1 = require("./types");
/**
 * basic passport strategy
 */
let BasicStrategy = class BasicStrategy {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.name = 'basic';
        /**
         * create a basic passport strategy with verify function to validate credentials
         */
        this.passportstrategy = new passport_http_1.BasicStrategy(this.verify.bind(this));
        /**
         * wrap the passport strategy instance with an adapter to plugin to LoopBack authentication
         */
        this.strategy = new authentication_passport_1.StrategyAdapter(this.passportstrategy, this.name, types_1.mapProfile.bind(this));
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
        /**
         * A dummy admin user is required for ease of testing purposes.
         * TODO:
         *   enable roles and authorization, add user with admin roles in the
         * beginning of the tests
         */
        if (username === 'admin' && password === 'password') {
            return done(null, {
                id: 999,
                name: 'admin',
                username: 'admin',
                email: 'admin@example.com',
            });
        }
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
            if (!users || !users.length) {
                return done(null, false);
            }
            const user = users[0];
            if (!user.credentials || user.credentials.password !== password) {
                return done(null, false);
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
};
BasicStrategy = tslib_1.__decorate([
    context_1.bind(authentication_1.asAuthStrategy),
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], BasicStrategy);
exports.BasicStrategy = BasicStrategy;
//# sourceMappingURL=basic.js.map