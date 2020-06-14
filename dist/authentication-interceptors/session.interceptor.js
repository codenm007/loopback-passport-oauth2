"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAuth = void 0;
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const types_1 = require("../authentication-strategies/types");
class SessionAuth {
    constructor() { }
    value() {
        return async (invocationCtx, next) => {
            const requestCtx = invocationCtx.getSync(rest_1.RestBindings.Http.CONTEXT);
            const request = requestCtx.request;
            if (request.user) {
                const user = request.user;
                requestCtx.bind(security_1.SecurityBindings.USER).to(types_1.mapProfile(user));
            }
            return next();
        };
    }
}
exports.SessionAuth = SessionAuth;
//# sourceMappingURL=session.interceptor.js.map