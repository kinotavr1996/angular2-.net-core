using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WriterApp.Data.Common.Pagination;
using WriterApp.Data.Context;
using WriterApp.Data.Model;

namespace WriterApp.Repository.Implementation
{
    public class BookRepository : RepositoryBase<Book>, IBookRepository
    {
        public BookRepository(WriterContext context) : base(context)
        {
        }
        public Book GetById(int id)
        {
            return Find().Include("WriterBooks.Writer").AsNoTracking().FirstOrDefault(x => x.Id == id);
        }
        public override void Delete(int id)
        {
            var book = Find().SingleOrDefault(x => x.Id == id);
            Remove(book);
        }
        public override IPagedList<Book> GetPage(int page = 1, int pageSize = 20, Func<IQueryable<Book>, IQueryable<Book>> filter = null)
        {
            return base.GetPage(page, pageSize, (query) => (filter != null ? filter(query) : query).Include("WriterBooks.Writer"));
        }
        public override void Edit(Book model)
        {
            var book = Find().Include("WriterBooks").SingleOrDefault(x => x.Id == model.Id);
            book.Caption = model.Caption;
            book.PublishedDate = model.PublishedDate;
            var ids = book.WriterBooks.Select(x => x.WriterId).ToList();
            foreach (var wb in model.WriterBooks.ToList())
            {
                if (!ids.Contains(wb.WriterId))
                    book.WriterBooks.Add(new WriterBook { WriterId = wb.WriterId });
            }
            ids = model.WriterBooks.Select(x => x.WriterId).ToList();
            foreach (var wb in book.WriterBooks.ToList())
            {
                if (!ids.Contains(wb.WriterId))
                    book.WriterBooks.Remove(book.WriterBooks.Where(y => y.WriterId == wb.WriterId).SingleOrDefault());
            }
            SaveChanges();
        }
    }
}
