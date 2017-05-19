using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WriterApp.Web.ViewModel;
using System.Linq;
using WriterApp.Repository;
using WriterApp.Data.Model;

namespace WriterApp.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IWriterRepository _writerRepository;
        public HomeController(
           IWriterRepository writerRepository
        )
        {
            _writerRepository = writerRepository;
        }
        public IQueryable<Writer> ApplyFilter(IQueryable<Writer> query, string searchString)
        {
            if (!String.IsNullOrEmpty(searchString))
                return query.Where(s => s.FirstName.ToUpper().Contains(searchString.ToUpper()) || s.LastName.ToUpper().Contains(searchString.ToUpper()));
            else
                return query;
        }
        public IQueryable<Writer> ApplySortOrder(IQueryable<Writer> query, string sortOrder, string direction)
        {
            switch (sortOrder)
            {
                case "fullname":
                    query = direction == "ASC" ? query.OrderBy(s => s.LastName).ThenBy(s => s.FirstName) : query.OrderByDescending(s => s.LastName).ThenByDescending(s => s.FirstName);
                    break;
                case "date":
                    query = direction == "ASC" ? query.OrderBy(s => s.DateOfBirth) : query.OrderByDescending(s => s.DateOfBirth);
                    break;
                default:
                    query = direction == "ASC" ? query.OrderBy(s => s.LastName).ThenBy(s => s.FirstName) : query.OrderByDescending(s => s.LastName).ThenByDescending(s => s.FirstName);
                    break;
            }
            return query;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
        //public async Task<IActionResult> Index(string sortOrder, string direction, string searchString, string currentFilter, int? page)
        //{
        //    WriterListViewModel writerList = new WriterListViewModel();
        //    writerList.Filter = searchString;
        //    writerList.Order.Column = sortOrder;
        //    writerList.Order.Direction = direction ?? "ASC";
        //    writerList.Page = page ?? 1;
        //    if (writerList.Filter != null)
        //        writerList.Page = 1;
        //    else
        //        writerList.Filter = currentFilter;
        //    var writers = _writerRepository.GetPage(writerList.Page, writerList.PageSize, (query) => ApplySortOrder(ApplyFilter(query, searchString), writerList.Order.Column, writerList.Order.Direction));
        //    foreach (var c in writers)
        //    {
        //        writerList.Items.Add(new WriterGridModel { Id = c.Id, FullName = $"{c.LastName} {c.FirstName}", DateOfBirth = c.DateOfBirth, Biography = c.Biography });
        //    }
        //    writerList.TotalPages = (int)Math.Ceiling(writers.TotalCount / (double)writerList.PageSize);
        //    return View(writerList);
        //}

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FirstName,LastName,DateOfBirth,Biography")] WriterCreateModel writer)
        {
            if (ModelState.IsValid)
            {
                _writerRepository.Add(new Writer
                {
                    FirstName = writer.FirstName,
                    LastName = writer.LastName,
                    DateOfBirth = writer.DateOfBirth,
                    Biography = writer.Biography
                });
                return RedirectToAction("Index");
            }
            return View(writer);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var writer = _writerRepository.GetById(id);
            return View(new WriterEditModel
            {
                FirstName = writer.FirstName,
                LastName = writer.LastName,
                DateOfBirth = writer.DateOfBirth,
                Biography = writer.Biography
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(WriterEditModel writer)
        {
            if (ModelState.IsValid)
            {
                _writerRepository.Edit(new Writer
                {
                    Id = writer.Id,
                    FirstName = writer.FirstName,
                    LastName = writer.LastName,
                    DateOfBirth = writer.DateOfBirth,
                    Biography = writer.Biography
                });
                return RedirectToAction("Index");
            }
            return View(writer);
        }

        public async Task<IActionResult> Delete(int id)
        {
            _writerRepository.Delete(id);
            return RedirectToAction("Index");
        }
    }
}
