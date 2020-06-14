import { Profile } from 'passport';
import { UserIdentityService } from '@loopback/authentication';
import { User } from '../models';
import { UserProfile } from '@loopback/security';
export declare type ProfileFunction = (accessToken: string, done: (err?: Error | null, profile?: any) => void) => void;
export declare type VerifyFunction = (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => void;
export declare namespace PassportAuthenticationBindings {
    const OAUTH2_STRATEGY = "passport.authentication.oauth2.strategy";
}
export declare const oauth2ProfileFunction: ProfileFunction;
/**
 * provides an appropriate verify function for oauth2 strategies
 * @param accessToken
 * @param refreshToken
 * @param profile
 * @param done
 */
export declare const verifyFunctionFactory: (userService: UserIdentityService<Profile, User>) => VerifyFunction;
/**
 * map passport profile to UserProfile in `@loopback/security`
 * @param user
 */
export declare const mapProfile: (user: User) => UserProfile;
