/// <reference types="express" />
import { Request } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
/**
 * A simple controller to bounce back http requests
 */
export declare class PingController {
    private req;
    constructor(req: Request);
    ping(): object;
    whoAmI(user: UserProfile): object;
}
