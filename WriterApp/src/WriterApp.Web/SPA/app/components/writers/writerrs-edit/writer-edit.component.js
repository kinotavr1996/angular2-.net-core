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
var writer_edit_model_1 = require("./../../../model/writer-edit.model");
var writer_http_service_1 = require("../writers-shared/writer-http.service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var WriterEditComponent = (function () {
    function WriterEditComponent(_httpService, route, router) {
        this._httpService = _httpService;
        this.route = route;
        this.router = router;
    }
    WriterEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
        });
        this._httpService.getWriterById(this.id)
            .subscribe(function (res) {
            _this.model = writer_edit_model_1.WriterEditModel.fromJSON(res);
        });
    };
    WriterEditComponent.prototype.onSubmitForm = function () {
        var _this = this;
        console.log(this.model);
        this._httpService.putCustomer(this.id, this.model)
            .subscribe(function (res) {
            console.log(_this.model);
            _this.model = writer_edit_model_1.WriterEditModel.fromJSON(res);
        });
    };
    return WriterEditComponent;
}());
WriterEditComponent = __decorate([
    core_1.Component({
        template: require('./writer-edit.component.html'),
        styles: [require('./writer-edit.component.css')]
    }),
    __metadata("design:paramtypes", [writer_http_service_1.WriterHttpService,
        router_1.ActivatedRoute,
        router_1.Router])
], WriterEditComponent);
exports.WriterEditComponent = WriterEditComponent;
//# sourceMappingURL=writer-edit.component.js.map