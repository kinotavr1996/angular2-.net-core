using System;
using WriterApp.Data.Model;

namespace WriterApp.Web.ViewModel
{
    public class ReportGridModel
    {
        public ReportGridModel()
        {
            NumberOfBooks = 0;
        }
        public string FullName { get; set; }
        public int NumberOfBooks { get; set; }
        public int? FirstBook { get; set; }
        public int? LastBook { get; set; }
    }
}
