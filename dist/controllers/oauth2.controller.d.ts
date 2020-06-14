/// <reference types="express" />
import { Response, RequestWithSession } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
/**
 * Login controller for third party oauth provider
 *
 * This controller demonstrates using passport strategies both as express middleware and as an independent strategy
 *
 * The method loginToThirdParty uses the @authenticate decorator to plugin passport strategies independently
 * The method thirdPartyCallBack uses the passport strategies as express middleware
 */
export declare class Oauth2Controller {
    constructor();
    /**
     * This method uses the @authenticate decorator to plugin passport strategies independently
     *
     * Endpoint: '/auth/thirdparty/{provider}'
     *          an endpoint for api clients to login via a third party app, redirects to third party app
     */
    loginToThirdParty(provider: string, redirectUrl: string, status: number, response: Response): Response<any>;
    thirdPartyCallBack(provider: string, user: UserProfile, request: RequestWithSession, response: Response): Promise<Response<any>>;
}
