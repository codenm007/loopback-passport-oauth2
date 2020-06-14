import { Profile } from 'passport';
import { UserIdentityService } from '@loopback/authentication';
import { User } from '../models';
import { StrategyOption } from 'passport-facebook';
import { Provider } from '@loopback/core';
import { Strategy as FacebookStrategy } from 'passport-facebook';
export declare class FacebookOauth implements Provider<FacebookStrategy> {
    facebookOptions: StrategyOption;
    userService: UserIdentityService<Profile, User>;
    strategy: FacebookStrategy;
    constructor(facebookOptions: StrategyOption, userService: UserIdentityService<Profile, User>);
    value(): FacebookStrategy;
}
