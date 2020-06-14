import { Provider, Interceptor, InvocationContext, Next } from '@loopback/core';
export declare class SessionAuth implements Provider<Interceptor> {
    constructor();
    value(): (invocationCtx: InvocationContext, next: Next) => Promise<import("@loopback/core").NonVoid>;
}
