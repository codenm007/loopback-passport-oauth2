import { Provider } from '@loopback/core';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { ExpressRequestHandler } from '@loopback/rest';
export declare class GoogleOauth2ExpressMiddleware implements Provider<ExpressRequestHandler> {
    strategy: GoogleStrategy;
    constructor(strategy: GoogleStrategy);
    value(): any;
}
