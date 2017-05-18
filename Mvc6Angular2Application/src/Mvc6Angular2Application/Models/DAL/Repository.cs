namespace Models.DAL
{
    using Microsoft.Data.Entity;
    using System;
    using System.Linq;
    using Validation;

    public class Repository
    {
        private TodoListContext dbContext;
        private IValidationDictionary validation;

        public Repository(TodoListContext dbContext, IValidationDictionary validation)
        {
            this.dbContext = dbContext;
            this.validation = validation;
        }

        public DbSet<T> Entity<T>()
            where T : class
        {
            return this.dbContext.Set<T>();
        }

        public void Insert<T>(T entity) where T : class
        {
            this.dbContext.Set<T>().Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            this.dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete<T>(T entity) where T : class
        {
            this.dbContext.Set<T>().Remove(entity);
        }

        public bool Save()
        {
            try
            {
                this.dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                this.validation.AddError(ex);

                return false;
            }

            return true;
        }
    }
}