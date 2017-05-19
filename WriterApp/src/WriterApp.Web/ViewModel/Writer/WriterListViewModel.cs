using System.Collections.Generic;

namespace WriterApp.Web.ViewModel
{
    public class WriterListViewModel
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public List<WriterGridModel> Items { get; set; }
        public string Filter { get; set; }
        public GridOrder Order { get; set; }

        public WriterListViewModel()
        {
            Order = new GridOrder();
            Items = new List<WriterGridModel>();
            PageSize = 4;
            Page = 1;
        }
        public bool HasPreviousPage
        {
            get
            {
                return (Page > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (Page < TotalPages);
            }
        }
    }
}
