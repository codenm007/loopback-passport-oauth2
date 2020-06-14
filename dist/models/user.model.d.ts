import { Entity } from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
import { UserIdentity } from './user-identity.model';
export declare class User extends Entity {
    id: number;
    name: string;
    realm?: string;
    username: string;
    email: string;
    emailVerified?: boolean;
    verificationToken?: string;
    credentials?: UserCredentials;
    profiles?: UserIdentity[];
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
