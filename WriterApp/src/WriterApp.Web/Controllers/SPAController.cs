using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using WriterApp.Data.Model;
using WriterApp.Repository;
using WriterApp.Web.ViewModel;

namespace WriterApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class SPAController : Controller
    {
        private readonly IWriterRepository _writerRepository;
        public SPAController(
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
        [HttpGet("", Name = "GetWithSortParametrs")]
        [ProducesResponseType(typeof(WriterListViewModel), 200)]
        [ProducesResponseType(typeof(WriterListViewModel), 404)]
        public ActionResult Get([FromQuery]string sortOrder, [FromQuery]string direction, [FromQuery]string searchString, [FromQuery]string currentFilter, [FromQuery]int? page)
        {
            WriterListViewModel writerList = new WriterListViewModel();
            writerList.Filter = searchString;
            writerList.Order.Column = sortOrder ?? "fullName";
            writerList.Order.Direction = direction ?? "ASC";
            writerList.Page = page ?? 1;
            if (writerList.Filter != null)
                writerList.Page = 1;
            else
                writerList.Filter = currentFilter;
            var writers = _writerRepository.GetPage(writerList.Page, writerList.PageSize, (query) => ApplySortOrder(ApplyFilter(query, searchString), writerList.Order.Column, writerList.Order.Direction));
            foreach (var c in writers)
            {
                writerList.Items.Add(new WriterGridModel { Id = c.Id, FullName = $"{c.LastName} {c.FirstName}", DateOfBirth = c.DateOfBirth, Biography = c.Biography });
            }
            writerList.TotalPages = (int)Math.Ceiling(writers.TotalCount / (double)writerList.PageSize);
            return Ok(writerList);
        }

        [HttpPost]
        [ProducesResponseType(typeof(WriterCreateModel), 201)]
        [ProducesResponseType(typeof(WriterCreateModel), 400)]
        public ActionResult Create([FromBody]WriterCreateModel writer)
        {

            _writerRepository.Add(new Writer
            {
                FirstName = writer.FirstName,
                LastName = writer.LastName,
                DateOfBirth = writer.DateOfBirth,
                Biography = writer.Biography
            });
            return Ok(writer);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(WriterEditModel), 200)]
        [ProducesResponseType(typeof(WriterEditModel), 404)]
        public ActionResult Edit(int id)
        {
            var writer = _writerRepository.GetById(id);
            return Ok(new WriterEditModel
            {
                FirstName = writer.FirstName,
                LastName = writer.LastName,
                DateOfBirth = writer.DateOfBirth,
                Biography = writer.Biography
            });
        }
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(WriterEditModel), 200)]
        [ProducesResponseType(typeof(WriterEditModel), 404)]
        [ProducesResponseType(typeof(WriterEditModel), 400)]
        public ActionResult Edit([FromRoute]int id, [FromBody]WriterEditModel writer)
        {
            _writerRepository.Edit(new Writer
            {
                Id = id,
                FirstName = writer.FirstName,
                LastName = writer.LastName,
                DateOfBirth = writer.DateOfBirth,
                Biography = writer.Biography
            });
            return Ok(writer);
        }
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Writer), 200)]
        [ProducesResponseType(typeof(Writer), 404)]
        public ActionResult Delete(int id)
        {
            _writerRepository.Delete(id);
            return Ok($"Writer {id} Deleted");
        }
    }
}
