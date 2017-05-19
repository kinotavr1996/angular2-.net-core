using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WriterApp.Data.Context;
using WriterApp.Data.Common.Pagination;

namespace WriterApp.Repository.Implementation
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class
    {
        private readonly WriterContext _dbContext;

        public WriterContext GetContext()
        {
            return _dbContext;
        }
        protected IQueryable<T> Find(Func<IQueryable<T>, IQueryable<T>> filter = null)
        {
            if (filter == null)
                return _dbContext.Set<T>();
            return filter(_dbContext.Set<T>());
        }
        protected virtual void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
        public RepositoryBase(WriterContext context)
        {
            _dbContext = context;
        }
        public virtual IEnumerable<T> Get(Func<IQueryable<T>, IQueryable<T>> filter = null)
        {
            return Find(filter).AsNoTracking().ToList();
        }
        public virtual IPagedList<T> GetPage(int page = 1, int pageSize = 20, Func<IQueryable<T>, IQueryable<T>> filter = null)
        {
            return new PagedList<T>(Find(filter).AsNoTracking(), page, pageSize);
        }

        public virtual void Add(T entity)
        {
            _dbContext.Add(entity);
            SaveChanges();
        }
        public virtual void Remove(T entity)
        {
            _dbContext.Remove(entity);
            SaveChanges();
        }
        public abstract void Edit(T entity);
        public abstract void Delete(int id);
    }
}
