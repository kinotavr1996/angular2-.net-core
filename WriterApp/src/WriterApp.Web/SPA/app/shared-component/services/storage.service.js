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
var config_1 = require("./../../config/config");
var core_1 = require("@angular/core");
var StorageService = (function () {
    function StorageService() {
        this.keys = {
            'user': 'user',
            'accessToken': 'AccessToken',
            'expiresIn': 'ExpiresIn',
            'language': 'lang',
            'loginCredentials': 'loginCredentials'
        };
        this.keyPrefix = config_1.AppConfig.projectName;
    }
    StorageService.prototype._getKey = function (key) {
        key = key.trim();
        if (key.length < 0) {
            return '';
        }
        return this.keyPrefix + "_" + key;
    };
    StorageService.prototype.setItem = function (key, value) {
        localStorage.setItem(this._getKey(key), value);
    };
    StorageService.prototype.getItem = function (key) {
        return localStorage.getItem(this._getKey(key));
    };
    StorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(this._getKey(key));
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map