"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_base_url_1 = require("./shared/api-base-url");
var api_request_urls_1 = require("./shared/api-request-urls");
var api_servers_enum_1 = require("./shared/api-servers.enum");
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());
AppConfig.apiUrl = api_base_url_1.ApiBaseUrl.get(api_servers_enum_1.ApiServers.dev);
AppConfig.urls = api_request_urls_1.ApiRequestUrls.urls;
AppConfig.projectName = 'WriterApp';
exports.AppConfig = AppConfig;
//# sourceMappingURL=config.js.map