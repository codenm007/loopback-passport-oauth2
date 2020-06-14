import { Profile as PassportProfile } from 'passport';
import { UserIdentityService } from '@loopback/authentication';
import { UserRepository } from '../repositories';
import { User } from '../models';
import { UserIdentityRepository } from '../repositories/user-identity.repository';
/**
 * User service to accept a 'passport' user profile and save it locally
 */
export declare class PassportUserIdentityService implements UserIdentityService<PassportProfile, User> {
    userRepository: UserRepository;
    userIdentityRepository: UserIdentityRepository;
    constructor(userRepository: UserRepository, userIdentityRepository: UserIdentityRepository);
    /**
     * find a linked local user for an external profile
     * create a local user if not created yet.
     * @param email
     * @param profile
     * @param token
     */
    findOrCreateUser(profile: PassportProfile): Promise<User>;
    /**
     * link external profile with local user
     * @param userId
     * @param userIdentity
     */
    linkExternalProfile(userId: string, userIdentity: PassportProfile): Promise<User>;
    /**
     * create a copy of the external profile
     * @param userId
     * @param userIdentity
     */
    createUser(userId: string, userIdentity: PassportProfile): Promise<void>;
}
