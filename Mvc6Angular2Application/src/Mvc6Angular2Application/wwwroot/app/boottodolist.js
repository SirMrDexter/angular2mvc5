"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_service_todolist_1 = require('./services/app.service.todolist');
var http_1 = require('@angular/http');
var todolist_component_1 = require('./components/todolist/todolist.component');
//enableProdMode();
platform_browser_dynamic_1.bootstrap(todolist_component_1.TodoListComponent, [http_1.HTTP_PROVIDERS, app_service_todolist_1.AppServiceTodoList]);
//# sourceMappingURL=boottodolist.js.map