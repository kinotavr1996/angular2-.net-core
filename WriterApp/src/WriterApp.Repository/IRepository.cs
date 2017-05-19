using System;
using System.Collections.Generic;
using System.Linq;
using WriterApp.Data.Common.Pagination;

namespace WriterApp.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> Get(Func<IQueryable<T>, IQueryable<T>> filter = null);
        IPagedList<T> GetPage(int page = 1, int pageSize = 20, Func<IQueryable<T>, IQueryable<T>> filter = null);
        void Add(T entity);
        void Edit(T entity);
        void Delete(int id);
    }
}
