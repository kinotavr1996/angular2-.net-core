"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var config_1 = require("./../../config/config");
var storage_service_1 = require("./storage.service");
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var HttpService = (function () {
    function HttpService(_http, _storage, _router) {
        this._http = _http;
        this._storage = _storage;
        this._router = _router;
    }
    HttpService.prototype.prepareHeaders = function (headersRaw) {
        var headers = new http_1.Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        if (headersRaw == null) {
            headers.append('Content-Type', 'application/json');
        }
        else {
            headersRaw.forEach(function (item) {
                headers.append(item.key, item.value);
            });
        }
        var token = this._storage.getItem(this._storage.keys.accessToken);
        headers.append('Authorization', 'bearer ' + token);
        return headers;
    };
    /* =============== METHODS ===============
    dataRaw     - regular JS object
    headersRaw  - object literal containing headers
    */
    HttpService.prototype.get = function (url, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.headersRaw, headersRaw = _c === void 0 ? null : _c, _d = _b.showLoader, showLoader = _d === void 0 ? true : _d;
        var headers = this.prepareHeaders(headersRaw);
        return this._http
            .get(config_1.AppConfig.apiUrl + url, { headers: headers })
            .map(function (response) {
            return response;
        })
            .catch(function (error) {
            _this.intercept(error);
            return Observable_1.Observable.throw(error);
        });
    };
    HttpService.prototype.post = function (url, dataRaw, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.headersRaw, headersRaw = _c === void 0 ? null : _c, _d = _b.showLoader, showLoader = _d === void 0 ? true : _d, _e = _b.stringifyData, stringifyData = _e === void 0 ? true : _e;
        var headers = this.prepareHeaders(headersRaw);
        var data = null;
        if (stringifyData) {
            data = JSON.stringify(dataRaw);
        }
        return this._http
            .post(config_1.AppConfig.apiUrl + url, data || dataRaw, { headers: headers })
            .map(function (response) {
            return response;
        })
            .catch(function (error) {
            _this.intercept(error);
            return Observable_1.Observable.throw(error);
        });
    };
    HttpService.prototype.put = function (url, dataRaw, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.headersRaw, headersRaw = _c === void 0 ? null : _c, _d = _b.showLoader, showLoader = _d === void 0 ? true : _d;
        var headers = this.prepareHeaders(headersRaw);
        var data = JSON.stringify(dataRaw);
        return this._http
            .put(config_1.AppConfig.apiUrl + url, data, { headers: headers })
            .map(function (response) {
            return response;
        })
            .catch(function (error) {
            _this.intercept(error);
            return Observable_1.Observable.throw(error);
        });
    };
    HttpService.prototype.delete = function (url, _a) {
        var _this = this;
        var _b = (_a === void 0 ? {} : _a).showLoader, showLoader = _b === void 0 ? true : _b;
        var headers = this.prepareHeaders(null);
        return this._http
            .delete(config_1.AppConfig.apiUrl + url, { headers: headers })
            .map(function (response) {
            return response;
        })
            .catch(function (error) {
            _this.intercept(error);
            return Observable_1.Observable.throw(error);
        });
    };
    HttpService.prototype.intercept = function (error) {
        if (error.status === 400) {
            return;
        }
        if (error.status === 401) {
            this._storage.removeItem(this._storage.keys.user);
            this._storage.removeItem(this._storage.keys.accessToken);
            this._storage.removeItem(this._storage.keys.expiresIn);
            this._router.navigate(['/login']);
            return;
        }
    };
    HttpService.prototype.formErrorMessage = function (error) {
        var errorMessage = 'Oops, something wrong!';
        var serverErrors = [];
        if (error && error._body) {
            serverErrors = JSON.parse(error._body);
        }
        var errorMessages = [];
        if (!!serverErrors) {
            for (var i in serverErrors) {
                if (serverErrors.hasOwnProperty(i)) {
                    var element = serverErrors[i];
                    errorMessages.push(serverErrors[i][0]);
                }
            }
        }
        errorMessage = errorMessages.join(', ');
        return errorMessage;
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        storage_service_1.StorageService,
        router_1.Router])
], HttpService);
exports.HttpService = HttpService;
;
;
;
;
;
//# sourceMappingURL=http.service.js.map