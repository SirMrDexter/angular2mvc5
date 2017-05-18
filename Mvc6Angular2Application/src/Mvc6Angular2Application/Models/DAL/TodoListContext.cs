using Microsoft.Data.Entity;

namespace Models.DAL
{
    public class TodoListContext : DbContext
    {
        private static bool _created = false;

        public TodoListContext()
        {
            if (!_created)
            {
                _created = true;
                Database.EnsureCreated();
            }
        }

        public DbSet<List> Lists { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}
