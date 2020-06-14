"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.startApplication = exports.setupApplication = exports.serverConfig = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const authentication_strategies_1 = require("./authentication-strategies");
const server_1 = require("./server");
tslib_1.__exportStar(require("./server"), exports);
/**
 * Prepare server config
 * @param oauth2Providers
 */
async function serverConfig(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
oauth2Providers) {
    var _a;
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            host: process.env.HOST,
            protocol: 'http',
            gracePeriodForClose: 5000,
            openApiSpec: {
                setServersFromRequest: true,
            },
            // Use the LB4 application as a route. It should not be listening.
            listenOnStart: false,
        },
        facebookOptions: oauth2Providers['facebook-login'],
        googleOptions: oauth2Providers['google-login'],
        oauth2Options: oauth2Providers['oauth2'],
    };
    return config;
}
exports.serverConfig = serverConfig;
/**
 * bind resources to application
 * @param server
 */
async function setupApplication(lbApp, dbBackupFile) {
    lbApp.bind('datasources.config.db').to({
        name: 'db',
        connector: 'memory',
        localStorage: '',
        file: dbBackupFile ? path.resolve(__dirname, dbBackupFile) : undefined,
    });
    lbApp
        .bind('authentication.oauth2.profile.function')
        .to(authentication_strategies_1.oauth2ProfileFunction);
}
exports.setupApplication = setupApplication;
/**
 * Start this application
 * @param oauth2Providers
 */
async function startApplication(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
oauth2Providers, dbBackupFile) {
    const config = await serverConfig(oauth2Providers);
    const server = new server_1.ExpressServer(config);
    await setupApplication(server.lbApp, dbBackupFile);
    await server.boot();
    await server.start();
    return server;
}
exports.startApplication = startApplication;
/**
 * run main() to start application with oauth config
 */
async function main() {
    let oauth2Providers;
    if (process.env.OAUTH_PROVIDERS_LOCATION) {
        oauth2Providers = require(process.env.OAUTH_PROVIDERS_LOCATION);
    }
    else {
        oauth2Providers = require('../oauth2-providers');
    }
    const server = await startApplication(oauth2Providers, process.env.DB_BKP_FILE_PATH);
    console.log(`Server is running at ${server.url}`);
}
exports.main = main;
if (require.main === module) {
    main().catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map