"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var writer_edit_component_1 = require("./writerrs-edit/writer-edit.component");
var writer_add_component_1 = require("./writers-add/writer-add.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var writer_list_component_1 = require("./writers-list/writer-list.component");
var writers_component_1 = require("./writers.component");
var writer_http_service_1 = require("./writers-shared/writer-http.service");
var paginator_component_1 = require("../../shared-component/paginator/paginator.component");
var WritersModule = (function () {
    function WritersModule() {
    }
    return WritersModule;
}());
WritersModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            router_1.RouterModule,
            forms_1.FormsModule
        ],
        declarations: [
            writers_component_1.WritersComponent,
            writer_list_component_1.WriterListComponent,
            writer_edit_component_1.WriterEditComponent,
            writer_add_component_1.WriterAddComponent
        ],
        providers: [
            writer_http_service_1.WriterHttpService,
            paginator_component_1.PagerService
        ]
    })
], WritersModule);
exports.WritersModule = WritersModule;
//# sourceMappingURL=writers.module.js.map