/// <reference types="express" />
import { Response, RequestWithSession } from '@loopback/rest';
import { UserRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
import { UserCredentialsRepository } from '../repositories/user-credentials.repository';
import { UserIdentityRepository } from '../repositories/user-identity.repository';
export declare type Credentials = {
    email: string;
    password: string;
    name: string;
};
export declare class UserLoginController {
    userRepository: UserRepository;
    userCredentialsRepository: UserCredentialsRepository;
    userIdentityRepository: UserIdentityRepository;
    constructor(userRepository: UserRepository, userCredentialsRepository: UserCredentialsRepository, userIdentityRepository: UserIdentityRepository);
    signup(credentials: Credentials, response: Response): Promise<Response<any>>;
    login(credentials: Credentials, user: UserProfile, request: RequestWithSession, response: Response): Promise<Response<any>>;
    /**
     * TODO: enable roles and authorization, add admin role authorization to this endpoint
     */
    clear(): Promise<void>;
    getExternalProfiles(profile: UserProfile): Promise<import("../models").UserIdentity[] | undefined>;
}
