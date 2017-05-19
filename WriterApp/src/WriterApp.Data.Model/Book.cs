using System;
using System.Collections.Generic;

namespace WriterApp.Data.Model
{
    public class Book
    {
        public int Id { get; set; }
        public string Caption { get; set; }
        public DateTime PublishedDate { get; set; }
        public virtual ICollection<WriterBook> WriterBooks { get; set; }
    }
}
