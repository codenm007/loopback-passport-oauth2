import { ApplicationConfig } from '@loopback/core';
import express from 'express';
import { OAuth2LoginApplication } from './application';
export { ApplicationConfig };
/**
 * An express server with multiple apps
 *
 *  1. WEB App
 *       a. An express web app which requires various user sign up provisions
 *       b. The express router is mounted in the root '/' path
 *  2. LB4 API server
 *       a. LB4 application provides passport login services for the express app
 *       b. The LB4 login apis are wrapped with session middleware to allow client sessions with user profiles
 */
export declare class ExpressServer {
    webApp: express.Application;
    readonly lbApp: OAuth2LoginApplication;
    private server?;
    url: String;
    constructor(options?: ApplicationConfig);
    boot(): Promise<void>;
    /**
     * Start the express app and the lb4 app
     */
    start(): Promise<void>;
    /**
     * Stop lb4 and express apps
     */
    stop(): Promise<void>;
}
