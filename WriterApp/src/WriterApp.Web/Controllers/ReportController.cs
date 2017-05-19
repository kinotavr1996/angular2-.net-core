using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WriterApp.Data.Model;
using WriterApp.Repository;
using WriterApp.Web.ViewModel;


namespace WriterApp.Web.Controllers
{
    public class ReportController : Controller
    {
        private readonly IWriterRepository _writerRepository;
        public ReportController(
           IWriterRepository writerRepository
        )
        {
            _writerRepository = writerRepository;
        }
        public IQueryable<WriterReport> ApplyFilter(IQueryable<WriterReport> query, string searchString)
        {
            if (!String.IsNullOrEmpty(searchString))
                return query.Where(s => s.FullName.ToUpper().Contains(searchString.ToUpper()));
            else
                return query;
        }
        public IQueryable<WriterReport> ApplySortOrder(IQueryable<WriterReport> query, string sortOrder, string direction)
        {
            switch (sortOrder)
            {
                case "fullname":
                    query = direction == "ASC" ? query.OrderBy(s => s.FullName) : query.OrderByDescending(s => s.FullName);
                    break;
                case "numberOfBooks":
                    query = direction == "ASC" ? query.OrderBy(s => s.NumberOfBooks) : query.OrderByDescending(s => s.NumberOfBooks);
                    break;
                default:
                    query = direction == "ASC" ? query.OrderBy(s => s.FullName) : query.OrderByDescending(s => s.FullName);
                    break;
            }
            return query;
        }
        public async Task<IActionResult> Index(string sortOrder, string direction, string searchString, string currentFilter, int? page)
        {
            ReportListViewModel reportList = new ReportListViewModel();
            reportList.Filter = searchString;
            reportList.Order.Column = sortOrder;
            reportList.Order.Direction = direction ?? "ASC";
            reportList.Page = page ?? 1;
            if (reportList.Filter != null)
                reportList.Page = 1;
            else
                reportList.Filter = currentFilter;
            var writers = _writerRepository.GetReportsPage(reportList.Page, reportList.PageSize, (query) => ApplySortOrder(ApplyFilter(query, searchString), reportList.Order.Column, reportList.Order.Direction));
            reportList.Items = writers.Select(x => new ReportGridModel
            {
                FullName = x.FullName,
                NumberOfBooks = x.NumberOfBooks,
                FirstBook = x.FirstBook,
                LastBook = x.LastBook
            }).ToList();
            reportList.TotalPages = (int)Math.Ceiling(writers.TotalCount / (double)reportList.PageSize);
            return View(reportList);
        }

    }
}
