/// <reference types="express" />
import { AuthenticationStrategy } from '@loopback/authentication';
import { StrategyAdapter } from '@loopback/authentication-passport';
import { Strategy } from 'passport-google-oauth2';
import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { Request, RedirectRoute } from '@loopback/rest';
export declare class GoogleOauth2Authorization implements AuthenticationStrategy {
    passportstrategy: Strategy;
    name: string;
    protected strategy: StrategyAdapter<User>;
    /**
     * create an oauth2 strategy for google
     */
    constructor(passportstrategy: Strategy);
    /**
     * authenticate a request
     * @param request
     */
    authenticate(request: Request): Promise<UserProfile | RedirectRoute>;
}
