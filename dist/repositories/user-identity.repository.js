"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let UserIdentityRepository = class UserIdentityRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.UserIdentity, dataSource);
    }
};
UserIdentityRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], UserIdentityRepository);
exports.UserIdentityRepository = UserIdentityRepository;
//# sourceMappingURL=user-identity.repository.js.map