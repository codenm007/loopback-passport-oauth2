/// <reference types="express" />
import { AuthenticationStrategy } from '@loopback/authentication';
import { StrategyAdapter } from '@loopback/authentication-passport';
import { Request, RedirectRoute } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { BasicStrategy as Strategy } from 'passport-http';
import { UserRepository } from '../repositories';
/**
 * basic passport strategy
 */
export declare class BasicStrategy implements AuthenticationStrategy {
    userRepository: UserRepository;
    name: string;
    passportstrategy: Strategy;
    strategy: StrategyAdapter<User>;
    constructor(userRepository: UserRepository);
    /**
     * authenticate a request
     * @param request
     */
    authenticate(request: Request): Promise<UserProfile | RedirectRoute>;
    /**
     * authenticate user with provided username and password
     *
     * @param username
     * @param password
     * @param done
     *
     * @returns User model
     */
    verify(username: string, password: string, done: (error: any, user?: any) => void): void;
}
