import { DefaultCrudRepository } from '@loopback/repository';
import { UserCredentials } from '../models';
import { DbDataSource } from '../datasources';
export declare class UserCredentialsRepository extends DefaultCrudRepository<UserCredentials, typeof UserCredentials.prototype.id, UserCredentials> {
    constructor(dataSource: DbDataSource);
}
