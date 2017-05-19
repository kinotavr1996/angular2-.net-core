import { WriterValidatior } from './../writer.validator';
import { WriterEditModel } from './../../../model/writer-edit.model';
import { WriterHttpService } from "../writers-shared/writer-http.service";
import { PagerService } from "../../../shared-component/paginator/paginator.component";
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    template: require('./writer-edit.component.html'),
    styles: [require('./writer-edit.component.css')]
})
export class WriterEditComponent {
    model: WriterEditModel;
    id: number;
    public validator: WriterValidatior;
    private sub: any;
    constructor(private _httpService: WriterHttpService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this._httpService.getWriterById(this.id)
            .subscribe(res => {
                this.model = WriterEditModel.fromJSON(res);
            });
    }

    onSubmitForm() {
        console.log(this.model);
        this._httpService.putCustomer(this.id, this.model)
            .subscribe(res => {
                console.log(this.model);
                this.model = WriterEditModel.fromJSON(res);
            });
    }
}