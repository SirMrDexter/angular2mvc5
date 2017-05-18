using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Models.DAL;
using WrapperExtensions;
using Models;
using Microsoft.Data.Entity;
using Models.ViewModel;

namespace Mvc6Angular2Application.Controllers
{
    public class HomeController : Controller
    {
        private readonly Repository _repository;

        public HomeController(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<TodoListContext>();

            this._repository = new Repository(context, new ModelStateWrapper(this.ModelState));
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetTodoList()
        {
            var tl = this._repository.Entity<List>().Include(i => i.Tasks).OrderBy(o => o.Id).ToList();

            return Json(tl);
        }

        [HttpPost]
        public JsonResult AddList([FromBody]List list)
        {
            this._repository.Insert(list);
            this._repository.Save();

            return Json(new JSONReturnVM<List>(list, this.ModelState));
        }

        [HttpPost]
        public JsonResult UpdateList([FromBody]List list)
        {
            this._repository.Update(list);
            this._repository.Save();

            return Json(new JSONReturnVM<List>(list, this.ModelState));
        }

        [HttpPost]
        public JsonResult DeleteList([FromBody]List list)
        {
            this._repository.Delete<List>(list);
            this._repository.Save();

            return Json(new JSONReturnVM<List>(list, this.ModelState));
        }

        [HttpPost]
        public JsonResult AddTask([FromBody]Task task)
        {
            this._repository.Insert(task);
            this._repository.Save();

            return Json(new JSONReturnVM<Task>(task, this.ModelState));
        }

        [HttpPost]
        public JsonResult UpdateTask([FromBody]Task task)
        {
            this._repository.Update(task);
            this._repository.Save();

            return Json(new JSONReturnVM<Task>(task, this.ModelState));
        }

        [HttpPost]
        public JsonResult DeleteTask([FromBody]Task task)
        {
            this._repository.Delete<Task>(task);
            this._repository.Save();

            return Json(new JSONReturnVM<Task>(task, this.ModelState));
        }
    }
}
