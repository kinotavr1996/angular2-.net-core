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
var writer_list_model_1 = require("./../../../model/writer-list.model");
var core_1 = require("@angular/core");
var writer_http_service_1 = require("../writers-shared/writer-http.service");
var paginator_component_1 = require("../../../shared-component/paginator/paginator.component");
var WriterListComponent = (function () {
    function WriterListComponent(_httpService, pagerService) {
        this._httpService = _httpService;
        this.pagerService = pagerService;
        this.isAddVisible = false;
        this.isEditVisible = false;
        this.pager = {};
    }
    WriterListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._httpService.getWriters()
            .subscribe(function (res) {
            _this.model = writer_list_model_1.WriterListModel.fromJSON(res);
            _this._setPage(1);
        });
    };
    WriterListComponent.prototype.delete = function (id) {
        this._httpService.deleteCustomer(id)
            .subscribe(function (res) {
            alert("Writer with id: " + id + "deleted");
        });
    };
    WriterListComponent.prototype.Sort = function (columnName) {
        var _this = this;
        if (this.model.direction == 'ASC') {
            this.model.direction = "DESC";
            this.model.column = columnName;
            this._httpService.getSortingCustomers(this.model.column, this.model.direction, this.model.page)
                .subscribe(function (res) {
                _this.model = writer_list_model_1.WriterListModel.fromJSON(res);
            });
        }
        else {
            this.model.direction = "ASC";
            this._httpService.getSortingCustomers(this.model.column, this.model.direction, this.model.page)
                .subscribe(function (res) {
                _this.model = writer_list_model_1.WriterListModel.fromJSON(res);
            });
        }
    };
    WriterListComponent.prototype._setPage = function (page) {
        var _this = this;
        if (page < 1 || page > this.model.totalPage) {
            return;
        }
        this.model.page = page;
        this.pager = this.pagerService.getPager(this.model.page, this.model.pageSize, this.model.totalPage);
        this._httpService.getSortingCustomers(this.model.column, this.model.direction, this.model.page)
            .subscribe(function (res) {
            _this.model = writer_list_model_1.WriterListModel.fromJSON(res);
        });
    };
    return WriterListComponent;
}());
WriterListComponent = __decorate([
    core_1.Component({
        template: require('./writer-list.component.html'),
        styles: [require('./writer-list.component.css')]
    }),
    __metadata("design:paramtypes", [writer_http_service_1.WriterHttpService, paginator_component_1.PagerService])
], WriterListComponent);
exports.WriterListComponent = WriterListComponent;
//# sourceMappingURL=writer-list.component.js.map