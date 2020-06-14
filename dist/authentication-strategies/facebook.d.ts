/// <reference types="express" />
import { AuthenticationStrategy } from '@loopback/authentication';
import { StrategyAdapter } from '@loopback/authentication-passport';
import { Strategy } from 'passport-facebook';
import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { Request, RedirectRoute } from '@loopback/rest';
export declare class FaceBookOauth2Authorization implements AuthenticationStrategy {
    passportStrategy: Strategy;
    name: string;
    protected strategy: StrategyAdapter<User>;
    /**
     * create an oauth2 strategy for facebook
     */
    constructor(passportStrategy: Strategy);
    /**
     * authenticate a request
     * @param request
     */
    authenticate(request: Request): Promise<UserProfile | RedirectRoute>;
}
