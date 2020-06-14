import { Provider, InvocationContext, Next, Interceptor } from '@loopback/core';
import { ExpressRequestHandler } from '@loopback/rest';
export declare class CustomOauth2Interceptor implements Provider<Interceptor> {
    oauth2Strategy: ExpressRequestHandler;
    constructor(oauth2Strategy: ExpressRequestHandler);
    value(): (invocationCtx: InvocationContext, next: Next) => Promise<import("@loopback/core").NonVoid>;
}
