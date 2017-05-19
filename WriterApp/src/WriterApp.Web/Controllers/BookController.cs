using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WriterApp.Data.Model;
using WriterApp.Repository;
using WriterApp.Web.ViewModel;

namespace BookApp.Web.Controllers
{
    public class BookController : Controller
    {
        private readonly IBookRepository _bookRepository;
        private readonly IWriterRepository _writerRepository;
        public BookController(
           IBookRepository bookRepository,
           IWriterRepository writerRepository
        )
        {
            _bookRepository = bookRepository;
            _writerRepository = writerRepository;
        }
        public IQueryable<Book> ApplyFilter(IQueryable<Book> query, string searchString)
        {
            if (!String.IsNullOrEmpty(searchString))
                return query.Where(s => s.Caption.ToUpper().Contains(searchString.ToUpper()) || s.Caption.ToUpper().Contains(searchString.ToUpper()));
            else
                return query;
        }
        public IQueryable<Book> ApplySortOrder(IQueryable<Book> query, string sortOrder, string direction)
        {
            switch (sortOrder)
            {
                case "caption":
                    query = direction == "ASC" ? query.OrderBy(s => s.Caption) : query.OrderByDescending(s => s.Caption);
                    break;
                case "date":
                    query = direction == "ASC" ? query.OrderBy(s => s.PublishedDate) : query.OrderByDescending(s => s.PublishedDate);
                    break;
                default:
                    query = direction == "ASC" ? query.OrderBy(s => s.Caption) : query.OrderByDescending(s => s.Caption);
                    break;
            }
            return query;
        }
        public async Task<IActionResult> Index(string sortOrder, string direction, string searchString, string currentFilter, int? page)
        {
            BookListViewModel bookList = new BookListViewModel();
            bookList.Filter = searchString;
            bookList.Order.Column = sortOrder;
            bookList.Order.Direction = direction ?? "ASC";
            bookList.Page = page ?? 1;
            if (bookList.Filter != null)
                bookList.Page = 1;
            else
                bookList.Filter = currentFilter;
            var books = _bookRepository.GetPage(bookList.Page, bookList.PageSize, (query) => ApplySortOrder(ApplyFilter(query, searchString), bookList.Order.Column, bookList.Order.Direction));
            bookList.Items = books.Select(x => new BookGridModel
            {
                Id = x.Id,
                Caption = x.Caption,
                PublishedDate = x.PublishedDate,
                Writers = x.WriterBooks.Select(w => new WriterGridModel { FullName = $"{w.Writer.LastName} {w.Writer.FirstName}", Id = w.Writer.Id }).ToList()
            }).ToList();
            bookList.TotalPages = (int)Math.Ceiling(books.TotalCount / (double)bookList.PageSize);
            return View(bookList);
        }
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            BookCreateModel book = new BookCreateModel();
            foreach (var w in _writerRepository.Get())
            {
                book.Writers.Add(new SelectListItem { Value = w.Id.ToString(), Text = $"{w.LastName} {w.FirstName}" });
            }
            return View(book);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]                                       
        public async Task<IActionResult> Create(BookCreateModel model)
        {
            if (ModelState.IsValid)
            {
                Book book = new Book
                {
                    Caption = model.Caption,
                    PublishedDate = model.PublishedDate,
                    WriterBooks = new List<WriterBook>()
                };
                foreach (var id in model.WriterIds)
                {
                    book.WriterBooks.Add(new WriterBook { WriterId = id });
                }
                _bookRepository.Add(book);
                return RedirectToAction("Index");
            }
            foreach (var w in _writerRepository.Get())
            {
                model.Writers.Add(new SelectListItem { Value = w.Id.ToString(), Text = $"{w.LastName} {w.FirstName}" });
            }
            return View(model);
        }
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            Book book = _bookRepository.GetById(id);
            return View(new BookEditModel
            {
                Caption = book.Caption,
                PublishedDate = book.PublishedDate,
                WriterIds = book.WriterBooks.Select(x => x.WriterId).ToList(),
                Writers = _writerRepository.Get().Select(x => new SelectListItem { Value = x.Id.ToString(), Text = $"{x.LastName} {x.FirstName}" }).ToList()
            });
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, BookEditModel model)
        {
            if (ModelState.IsValid)
            {
                Book book = new Book
                {
                    Id = id,
                    Caption = model.Caption,
                    PublishedDate = model.PublishedDate,
                    WriterBooks = new List<WriterBook>()
                };
                foreach (var wid in model.WriterIds)
                {
                    book.WriterBooks.Add(new WriterBook { WriterId = wid, BookId = id });
                }
                _bookRepository.Edit(book);
                return RedirectToAction("Index");
            }
            foreach (var w in _writerRepository.Get())
            {
                model.Writers.Add(new SelectListItem { Value = w.Id.ToString(), Text = $"{w.LastName} {w.FirstName}" });
            }
            return View(model);
        }

        public async Task<IActionResult> Delete(int id)
        {
            _bookRepository.Delete(id);
            return RedirectToAction("Index");
        }
    }
}
