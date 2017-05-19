using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WriterApp.Web.ViewModel
{
    public class BookEditModel
    {
        public BookEditModel()
        {
            Writers = new List<SelectListItem>();
        }
        public int Id { get; set; }
        [Required]
        [StringLength(256)]
        public string Caption { get; set; }
        [Required]
        public DateTime PublishedDate { get; set; }
        [Required]
        public List<int> WriterIds { get; set; }
        public List<SelectListItem> Writers { get; set; }
    }
}
