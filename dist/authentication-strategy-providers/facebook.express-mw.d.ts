import { Provider } from '@loopback/core';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { ExpressRequestHandler } from '@loopback/rest';
export declare class FacebookOauth2ExpressMiddleware implements Provider<ExpressRequestHandler> {
    facebookStrategy: FacebookStrategy;
    constructor(facebookStrategy: FacebookStrategy);
    value(): any;
}
