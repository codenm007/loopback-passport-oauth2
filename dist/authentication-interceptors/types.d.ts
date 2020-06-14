/**
 *  Name: OAuth2InterceptExpressMiddleware
 *  Type: DECORATOR
 *
 *  This method uses the @intercept decorator to intercept incoming requests with a series of passport strategies.
 *  It composes an middleware interceptor chain with the following interceptor keys:
 *      'passport-init-mw',
 *      'passport-session-mw',
 *      'passport-facebook',
 *      'passport-google',
 *      'passport-oauth2'
 */
export declare function oAuth2InterceptExpressMiddleware(): (target: any, method?: string | undefined, methodDescriptor?: TypedPropertyDescriptor<any> | undefined) => any;
