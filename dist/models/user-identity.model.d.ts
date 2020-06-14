import { Entity } from '@loopback/repository';
export declare class UserIdentity extends Entity {
    id: string;
    provider: string;
    profile: object;
    credentials?: object;
    authScheme: string;
    created?: Date;
    userId: number;
    constructor(data?: Partial<UserIdentity>);
}
export interface UserIdentityRelations {
}
export declare type UserIdentityWithRelations = UserIdentity & UserIdentityRelations;
