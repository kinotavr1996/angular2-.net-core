import { WriterAddComponent } from './writers-add/writer-add.component';
import { WriterEditComponent } from './writerrs-edit/writer-edit.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriterListComponent } from "./writers-list/writer-list.component";
import { WritersComponent } from "./writers.component";

export const writersRoutes: Routes = [{
    path: 'writers',
    component: WritersComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: WriterListComponent },
        { path: ':id/edit', component: WriterEditComponent },
        { path: 'add', component: WriterAddComponent }

    ]
}];

export const appRoutingProviders: any[] = [];
export const writersRouting: ModuleWithProviders = RouterModule.forChild(writersRoutes);
