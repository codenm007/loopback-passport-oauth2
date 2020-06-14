import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { User, UserIdentity, UserCredentials } from '../models';
import { UserIdentityRepository } from './user-identity.repository';
import { UserCredentialsRepository } from './user-credentials.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    protected profilesGetter: Getter<UserIdentityRepository>;
    protected credentialsGetter: Getter<UserCredentialsRepository>;
    readonly profiles: HasManyRepositoryFactory<UserIdentity, typeof User.prototype.id>;
    readonly credentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    constructor(dataSource: DbDataSource, profilesGetter: Getter<UserIdentityRepository>, credentialsGetter: Getter<UserCredentialsRepository>);
}
