using Microsoft.Extensions.DependencyInjection;
using Microsoft.Data.Entity;
using System;
using System.Linq;

namespace Models.DAL
{
    public static class TodoListInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<TodoListContext>();

            if (!context.Lists.Any() && !context.Tasks.Any())
            {
                context.Lists.AddRange(
                    new List { Name = "List1" },
                    new List { Name = "List2" }
                    );

                context.SaveChanges();

                var list1id = context.Lists.Single(s => s.Name == "List1").Id;
                var list2id = context.Lists.Single(s => s.Name == "List2").Id;

                context.Tasks.AddRange(
                    new Task { ListId = list1id, Name = "Task0101" },
                    new Task { ListId = list1id, Name = "Task0102" },
                    new Task { ListId = list1id, Name = "Task0103" },
                    new Task { ListId = list2id, Name = "Task0201" },
                    new Task { ListId = list2id, Name = "Task0202" }
                    );

                context.SaveChanges();
            }
        }
    }
}
