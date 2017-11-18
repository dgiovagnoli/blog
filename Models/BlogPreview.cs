using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Models;

namespace CSharpProject.Models
{
    public class BlogPreview
    {
        public string Name { get; set; }
        public string Introduction { get; set; }
        public string ImageUrl { get; set; }
        public string LinkUrl { get; set; }
        public string OriginalImage { get; set; }

        public BlogPreview(string name, string introduction, string imageUrl, string linkUrl, string originalImage)
        {
            Name = name;
            Introduction = introduction;
            ImageUrl = imageUrl;
            LinkUrl = linkUrl;
            OriginalImage = originalImage;

        }


    }


}