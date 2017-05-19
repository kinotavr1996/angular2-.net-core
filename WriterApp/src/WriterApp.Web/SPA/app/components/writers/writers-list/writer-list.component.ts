import { WriterListModel } from './../../../model/writer-list.model';
import { Component, Input, OnInit } from '@angular/core';
import { WriterModel } from "../../../model/writer.model";
import { WriterHttpService } from "../writers-shared/writer-http.service";
import { PagerService } from "../../../shared-component/paginator/paginator.component";

@Component({
    template: require('./writer-list.component.html'),
    styles: [require('./writer-list.component.css')]
})
export class WriterListComponent implements OnInit {
    isAddVisible: boolean = false;
    isEditVisible: boolean = false;
    model: WriterListModel;
    editModel: WriterModel;
    pager: any = {};
    pagedItems: any[];

    constructor(private _httpService: WriterHttpService, private pagerService: PagerService) { }

    ngOnInit() {
        this._httpService.getWriters()
            .subscribe(res => {
                this.model = WriterListModel.fromJSON(res);
                this._setPage(1);
            });
    }
    delete(id: number) {
        this._httpService.deleteCustomer(id)
            .subscribe(res => {
                alert("Writer with id: " + id + "deleted");
            });
    }
    Sort(columnName: string) {
        if (this.model.direction == 'ASC') {
            this.model.direction = "DESC";
            this.model.column = columnName;
            this._httpService.getSortingCustomers(this.model.column, this.model.direction, this.model.page)
                .subscribe(res => {
                    this.model = WriterListModel.fromJSON(res);
                });
        }
        else {
            this.model.direction = "ASC";
            this._httpService.getSortingCustomers(this.model.column, this.model.direction, this.model.page)
                .subscribe(res => {
                    this.model = WriterListModel.fromJSON(res);
                });
        }

    }

    private _setPage(page: number) {
        if (page < 1 || page > this.model.totalPage) {
            return;
        }
        this.model.page = page;
        this.pager = this.pagerService.getPager(this.model.page, this.model.pageSize, this.model.totalPage);
        this._httpService.getSortingCustomers(this.model.column, this.model.direction, this.model.page)
            .subscribe(res => {
                this.model = WriterListModel.fromJSON(res);
            });
    }
}
