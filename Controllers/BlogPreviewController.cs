using CSharpProject.Models;

using System.Collections.Generic;
using System.Linq;

using System.Web.Mvc;
using Umbraco.Core.Models;
using Umbraco.Web;

using Umbraco.Web.Mvc;


namespace CSharpProject.Controllers
{
    public class BlogPreviewController : SurfaceController
    {

        private const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/Content/";


        public ActionResult RenderBlogPreview()
        {

            List<BlogPreview> model = new List<BlogPreview>();
            IPublishedContent BlogPage =
              CurrentPage.AncestorOrSelf(1)
                  .DescendantsOrSelf()
                  .Where(x => x.DocumentTypeAlias == "blog").FirstOrDefault();

            foreach (IPublishedContent page in BlogPage.Children)
            {

                int imageId = page.GetPropertyValue<int>("articleImage");
                var mediaItem = Umbraco.Media(imageId);
                var cropUrl = page.GetPropertyValue<IPublishedContent>("articleImage").Url + "?width=840&height=430&mode=crop&anchor=center";
                model.Add(new BlogPreview(page.Name, page.GetPropertyValue<string>("articleIntro"), mediaItem.Url, page.Url, cropUrl));
               
            }


            return PartialView(PARTIAL_VIEW_FOLDER + "_Articles.cshtml", model);
        }

       
    }

}
