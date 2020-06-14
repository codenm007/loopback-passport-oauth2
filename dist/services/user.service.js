"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportUserIdentityService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const user_identity_repository_1 = require("../repositories/user-identity.repository");
/**
 * User service to accept a 'passport' user profile and save it locally
 */
let PassportUserIdentityService = class PassportUserIdentityService {
    constructor(userRepository, userIdentityRepository) {
        this.userRepository = userRepository;
        this.userIdentityRepository = userIdentityRepository;
    }
    /**
     * find a linked local user for an external profile
     * create a local user if not created yet.
     * @param email
     * @param profile
     * @param token
     */
    async findOrCreateUser(profile) {
        if (!profile.emails || !profile.emails.length) {
            throw new Error('email-id is required in returned profile to login');
        }
        const email = profile.emails[0].value;
        const users = await this.userRepository.find({
            where: {
                email: email,
            },
        });
        let user;
        if (!users || !users.length) {
            const name = profile.name && profile.name.givenName
                ? profile.name.givenName + ' ' + profile.name.familyName
                : profile.displayName;
            user = await this.userRepository.create({
                email: email,
                name: name || JSON.stringify(profile.name),
                username: email,
            });
        }
        else {
            user = users[0];
        }
        user = await this.linkExternalProfile('' + user.id, profile);
        return user;
    }
    /**
     * link external profile with local user
     * @param userId
     * @param userIdentity
     */
    async linkExternalProfile(userId, userIdentity) {
        let profile;
        try {
            profile = await this.userIdentityRepository.findById(userIdentity.id);
        }
        catch (err) {
            // no need to throw an error if entity is not found
            if (!(err.code === 'ENTITY_NOT_FOUND')) {
                throw err;
            }
        }
        if (!profile) {
            await this.createUser(userId, userIdentity);
        }
        else {
            await this.userIdentityRepository.updateById(userIdentity.id, {
                profile: {
                    emails: userIdentity.emails,
                },
                created: new Date(),
            });
        }
        if (!userId)
            console.log('user id is empty');
        return this.userRepository.findById(parseInt(userId), {
            include: [
                {
                    relation: 'profiles',
                },
            ],
        });
    }
    /**
     * create a copy of the external profile
     * @param userId
     * @param userIdentity
     */
    async createUser(userId, userIdentity) {
        await this.userIdentityRepository.create({
            id: userIdentity.id,
            provider: userIdentity.provider,
            authScheme: userIdentity.provider,
            userId: parseInt(userId),
            profile: {
                emails: userIdentity.emails,
            },
            created: new Date(),
        });
    }
};
PassportUserIdentityService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(user_identity_repository_1.UserIdentityRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        user_identity_repository_1.UserIdentityRepository])
], PassportUserIdentityService);
exports.PassportUserIdentityService = PassportUserIdentityService;
//# sourceMappingURL=user.service.js.map