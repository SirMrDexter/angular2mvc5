﻿import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpHelpers} from '../utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
//import 'rxjs/Rx';

@Injectable()
export class AppServiceTodoList extends HttpHelpers {

    private _getTodoListUrl = 'Home/GetTodoList';

    private _getListAddUrl = 'Home/AddList';
    private _getListUpdateUrl = 'Home/UpdateList';
    private _getListDeleteUrl = 'Home/DeleteList';

    private _getTaskAddUrl = 'Home/AddTask';
    private _getTaskUpdateUrl = 'Home/UpdateTask';
    private _getTaskDeleteUrl = 'Home/DeleteTask';

    private _todolist: Models.List[];

    constructor(private http: Http) {
        super(http);

        this.getaction<Models.List[]>(this._getTodoListUrl).subscribe(
            result => {
                this._todolist = result;

                if (this._todolist.length > 0) {
                    this.SelectedList = this._todolist[0];
                }
            },
            error => this.errormsg = error);
    }

    get todolist(): Models.List[] {
        if (this._todolist) {
            this._todolist.map(m => {
                if (m.Tasks) {
                    m.Count = m.Tasks.length;
                    m.CountEnded = m.Tasks.filter(f => f.Ended).length;
                }
            });
        }

        return this._todolist;
    }

    SelectedList: Models.List;

    AddList(list: Models.List) {
        this.postaction(list, this._getListAddUrl).subscribe(
            result => {
                if (!result.haserror) {
                    result.element.Tasks = new Array<Models.Task>();
                    this._todolist.push(result.element);
                }
            }, error => this.errormsg = error);
    }

    UpdateList(list: Models.List) {
        this.postaction(list, this._getListUpdateUrl).subscribe(result => result, error => this.errormsg = error);
    }

    DeleteList(list: Models.List) {
        this.postaction(list, this._getListDeleteUrl).subscribe(result => {

            if (!result.haserror) {
                var index = this._todolist.indexOf(list, 0);

                if (index > -1) {
                    this._todolist.splice(index, 1);
                }
            }
        }, error => this.errormsg = error);
    }

    AddTask(task: Models.Task) {
        this.postaction(task, this._getTaskAddUrl).subscribe(result => {
            if (!result.haserror) {
                this.SelectedList.Tasks.push(result.element);
            }
        }, error => this.errormsg = error);
    }

    UpdateTask(task: Models.Task) {
        this.postaction(task, this._getTaskUpdateUrl).subscribe(result => result, error => this.errormsg = error);
    }

    DeleteTask(task: Models.Task) {
        this.postaction(task, this._getTaskDeleteUrl).subscribe(result => {

            if (!result.haserror) {
                var index = this.SelectedList.Tasks.indexOf(task, 0);

                if (index > -1) {
                    this.SelectedList.Tasks.splice(index, 1);
                }
            }
        }, error => this.errormsg = error);
    }
}