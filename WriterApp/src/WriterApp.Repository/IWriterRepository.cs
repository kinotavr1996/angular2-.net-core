using System;
using System.Collections.Generic;
using System.Linq;
using WriterApp.Data.Common.Pagination;
using WriterApp.Data.Model;

namespace WriterApp.Repository
{
    public interface IWriterRepository : IRepository<Writer>
    {
        Writer GetById(int id);
        IPagedList<WriterReport> GetReportsPage(int page = 1, int pageSize = 20, Func<IQueryable<WriterReport>, IQueryable<WriterReport>> filter = null);
    }
}
