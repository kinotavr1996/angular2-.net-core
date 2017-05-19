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
var core_1 = require("@angular/core");
var config_1 = require("../../../config/config");
var http_service_1 = require("../../../shared-component/services/http.service");
require("rxjs/Rx");
var WriterHttpService = (function () {
    function WriterHttpService(_httpService) {
        this._httpService = _httpService;
    }
    WriterHttpService.prototype.getWriterById = function (id) {
        return this._httpService.get(config_1.AppConfig.urls.spa + "/" + id)
            .map(function (res) { return res.json(); });
    };
    WriterHttpService.prototype.getSortingCustomers = function (sortBy, orderBy, pageNumber) {
        return this._httpService.get(config_1.AppConfig.urls.spa
            + "?sortOrder=" + sortBy + "&direction=" + orderBy + "&page=" + pageNumber)
            .map(function (res) { return res.json(); });
    };
    WriterHttpService.prototype.getWriters = function () {
        return this._httpService.get(config_1.AppConfig.urls.spa)
            .map(function (res) { return res.json(); });
    };
    WriterHttpService.prototype.postCustomer = function (data) {
        return this._httpService.post(config_1.AppConfig.urls.spa, data)
            .map(function (res) { return res.json(); });
    };
    WriterHttpService.prototype.putCustomer = function (id, data) {
        return this._httpService.put(config_1.AppConfig.urls.spa + "/" + id, data)
            .map(function (res) { return res.json(); });
    };
    WriterHttpService.prototype.deleteCustomer = function (id) {
        return this._httpService.delete(config_1.AppConfig.urls.spa + "/" + id)
            .map(function (res) { return res.json(); });
    };
    return WriterHttpService;
}());
WriterHttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], WriterHttpService);
exports.WriterHttpService = WriterHttpService;
//# sourceMappingURL=writer-http.service.js.map