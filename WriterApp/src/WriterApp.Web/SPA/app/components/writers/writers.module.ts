import { WriterEditComponent } from './writerrs-edit/writer-edit.component';
import { WriterAddComponent } from './writers-add/writer-add.component';
import { HttpService } from './../../shared-component/services/http.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { writersRoutes } from './writers.routing';
import { WriterListComponent } from "./writers-list/writer-list.component";
import { WritersComponent } from "./writers.component";
import { WriterHttpService } from "./writers-shared/writer-http.service";
import { PagerService } from "../../shared-component/paginator/paginator.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        WritersComponent,
        WriterListComponent,
        WriterEditComponent,
        WriterAddComponent
    ],
    providers: [
        WriterHttpService,
        PagerService
    ]
})
export class WritersModule { }
