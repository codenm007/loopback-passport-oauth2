import { Profile } from 'passport';
import { UserIdentityService } from '@loopback/authentication';
import { User } from '../models';
import { StrategyOption } from 'passport-facebook';
import { Provider } from '@loopback/core';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
export declare class GoogleOauth implements Provider<GoogleStrategy> {
    oauth2Options: StrategyOption;
    userService: UserIdentityService<Profile, User>;
    strategy: GoogleStrategy;
    constructor(oauth2Options: StrategyOption, userService: UserIdentityService<Profile, User>);
    value(): GoogleStrategy;
}
