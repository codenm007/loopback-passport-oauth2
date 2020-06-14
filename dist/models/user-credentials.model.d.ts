import { Entity } from '@loopback/repository';
export declare class UserCredentials extends Entity {
    id: string;
    password: string;
    userId?: number;
    constructor(data?: Partial<UserCredentials>);
}
export interface UserCredentialsRelations {
}
export declare type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
