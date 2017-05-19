"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writer_add_component_1 = require("./writers-add/writer-add.component");
var writer_edit_component_1 = require("./writerrs-edit/writer-edit.component");
var router_1 = require("@angular/router");
var writer_list_component_1 = require("./writers-list/writer-list.component");
var writers_component_1 = require("./writers.component");
exports.writersRoutes = [{
        path: 'writers',
        component: writers_component_1.WritersComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: writer_list_component_1.WriterListComponent },
            { path: ':id/edit', component: writer_edit_component_1.WriterEditComponent },
            { path: 'add', component: writer_add_component_1.WriterAddComponent }
        ]
    }];
exports.appRoutingProviders = [];
exports.writersRouting = router_1.RouterModule.forChild(exports.writersRoutes);
//# sourceMappingURL=writers.routing.js.map