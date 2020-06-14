"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, profilesGetter, credentialsGetter) {
        super(models_1.User, dataSource);
        this.profilesGetter = profilesGetter;
        this.credentialsGetter = credentialsGetter;
        this.profiles = this.createHasManyRepositoryFactoryFor('profiles', profilesGetter);
        this.registerInclusionResolver('profiles', this.profiles.inclusionResolver);
        this.credentials = this.createHasOneRepositoryFactoryFor('credentials', credentialsGetter);
        this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
    }
};
UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__param(1, repository_1.repository.getter('UserIdentityRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UserCredentialsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource, Function, Function])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map