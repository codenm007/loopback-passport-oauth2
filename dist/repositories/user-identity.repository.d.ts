import { DefaultCrudRepository } from '@loopback/repository';
import { UserIdentity } from '../models';
import { DbDataSource } from '../datasources';
export declare class UserIdentityRepository extends DefaultCrudRepository<UserIdentity, typeof UserIdentity.prototype.id, UserIdentity> {
    constructor(dataSource: DbDataSource);
}
