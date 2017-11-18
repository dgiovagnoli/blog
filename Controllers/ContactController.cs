using System.Web.Mvc;
using Umbraco.Web.Mvc;
using CSharpProject.Models;
using System.Net.Mail;
using log4net;
using System.Reflection;

namespace CSharpProject.Controllers
{
    public class ContactController : SurfaceController
    {
        public string GetViewPath(string name)
        {
            return $"/Views/Partials/Contact/{name}.cshtml";
        }

        [HttpGet]
        public ActionResult RenderForm()
        {
            ContactViewModel model = new ContactViewModel();
            return PartialView(GetViewPath("_ContactForm"), model);
        }

        [HttpPost]
        public ActionResult RenderForm(ContactViewModel model)
        {
            return PartialView(GetViewPath("_ContactForm"), model);
        }

        [HttpPost]
        public ActionResult SubmitForm(ContactViewModel model)
        {
            bool success = false;
            if (ModelState.IsValid)
            {
                success = SendEmail(model);
            }
            return PartialView(GetViewPath(success ? "_Success" : "_Error"));
        }

        public bool SendEmail(ContactViewModel model)
        {
            ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            try { 

                MailMessage message = new MailMessage();
                SmtpClient client = new SmtpClient();
                string toAddress = System.Web.Configuration.WebConfigurationManager.AppSettings["ContactEmailTo"];
                string fromAddress = System.Web.Configuration.WebConfigurationManager.AppSettings["ContactEmailFrom"];
                message.Subject = $"Enquiry from: {model.Name} - { model.Email}";
                message.Body = model.Message;
                message.To.Add(new MailAddress(toAddress, toAddress));
                message.From = new MailAddress(fromAddress, fromAddress);

                client.Send(message);

                return true;
            }

            catch(System.Exception ex)
            {
                Log.Error("Contact Form Error", ex);
                return false;
            }
        }

    }
}



        