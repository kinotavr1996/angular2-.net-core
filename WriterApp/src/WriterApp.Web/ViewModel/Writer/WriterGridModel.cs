using System;
using System.Collections.Generic;

namespace WriterApp.Web.ViewModel
{
    public class WriterGridModel
    {
        public WriterGridModel()
        {
            Books = new List<BookGridModel>();
        }
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Biography { get; set; }
        public List<BookGridModel> Books { get; set; }
    }
}
