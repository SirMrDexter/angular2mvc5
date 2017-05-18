import {enableProdMode} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic'
import {AppServiceTodoList} from './services/app.service.todolist';
import {HTTP_PROVIDERS} from '@angular/http';
import {TodoListComponent} from './components/todolist/todolist.component';

//enableProdMode();
bootstrap(TodoListComponent, [HTTP_PROVIDERS, AppServiceTodoList]); 