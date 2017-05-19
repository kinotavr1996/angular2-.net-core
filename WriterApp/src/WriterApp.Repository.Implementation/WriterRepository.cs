using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WriterApp.Data.Common.Pagination;
using WriterApp.Data.Context;
using WriterApp.Data.Model;

namespace WriterApp.Repository.Implementation
{
    public class WriterRepository : RepositoryBase<Writer>, IWriterRepository
    {

        public WriterRepository(WriterContext context) : base(context)
        {
        }
        public Writer GetById(int id)
        {
            return Find().AsNoTracking().FirstOrDefault(x => x.Id == id);
        }
        public override IPagedList<Writer> GetPage(int page = 1, int pageSize = 20, Func<IQueryable<Writer>, IQueryable<Writer>> filter = null)
        {
            return base.GetPage(page, pageSize, (query) => (filter != null ? filter(query) : query));
        }
        public IPagedList<WriterReport> GetReportsPage(int page = 1, int pageSize = 20, Func<IQueryable<WriterReport>, IQueryable<WriterReport>> filter = null)
        {
            var context = GetContext();
            List<WriterReport> writerReposts = new List<WriterReport>();
            var bookQuery = context.WriterBooks.Join(context.Books, wb => wb.BookId, b => b.Id, (wb, b) => new { wb, b })
                                                  .Where(wwb => wwb.wb.BookId == wwb.b.Id)
                                                  .GroupBy(g => g.wb.WriterId)
                                                  .Select(wwb => 
                                                            new {
                                                                WriterId = wwb.Key,
                                                                MaxDate = wwb.Max(b => b.b.PublishedDate).Year,
                                                                MinDate = wwb.Min(b => b.b.PublishedDate).Year,
                                                                Count = wwb.Count()
                                                            });
            var writerBookQuery = context.Writers.GroupJoin(bookQuery, wb => wb.Id, w => w.WriterId, (wb, w) => new { wb, w })
                                              .SelectMany(x => x.w.DefaultIfEmpty(),
                                               (wb, w) => new
                                               {
                                                   Id = wb.wb.Id,
                                                   FullName = wb.wb.LastName + " " + wb.wb.FirstName,
                                                   Qty = w == null ? 0 : w.Count,
                                                   MinDate = w == null ? (int?)null : w.MinDate,
                                                   MaxDate = w == null ? (int?)null : w.MaxDate
                                               }).OrderBy(x => x.Qty);
            foreach(var item in writerBookQuery)
            {
                writerReposts.Add(new WriterReport { FirstBook = item.MinDate, LastBook = item.MaxDate, NumberOfBooks = item.Qty, FullName = item.FullName });
            }
            return new PagedList<WriterReport>(filter(writerReposts.AsQueryable()), page, pageSize);
        }
        public override void Delete(int id)
        {
            var writer = Find().SingleOrDefault(x => x.Id == id);
            Remove(writer);
        }
        public override void Edit(Writer writer)
        {
            var _writer = Find().SingleOrDefault(x => x.Id == writer.Id);
            _writer.FirstName = writer.FirstName;
            _writer.LastName = writer.LastName;
            _writer.DateOfBirth = writer.DateOfBirth;
            _writer.Biography = writer.Biography;
            SaveChanges();
        }
    }
}
