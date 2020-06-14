import { RestApplication } from '@loopback/rest';
import { ApplicationConfig, ExpressServer } from './server';
export * from './server';
/**
 * Prepare server config
 * @param oauth2Providers
 */
export declare function serverConfig(oauth2Providers: any): Promise<ApplicationConfig>;
/**
 * bind resources to application
 * @param server
 */
export declare function setupApplication(lbApp: RestApplication, dbBackupFile?: string): Promise<void>;
/**
 * Start this application
 * @param oauth2Providers
 */
export declare function startApplication(oauth2Providers: any, dbBackupFile?: string): Promise<ExpressServer>;
/**
 * run main() to start application with oauth config
 */
export declare function main(): Promise<void>;
