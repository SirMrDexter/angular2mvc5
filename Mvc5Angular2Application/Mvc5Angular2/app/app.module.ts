import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {AppServiceTodoList} from './services/app.service.todolist';
import {TodoListComponent} from './components/todolist/todolist.component';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    providers: [AppServiceTodoList],
    declarations: [TodoListComponent],
    bootstrap: [TodoListComponent]
})
export class AppModule { }