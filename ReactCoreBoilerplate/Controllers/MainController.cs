using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ReactCoreBoilerplate.Models;

namespace ReactCoreBoilerplate.Controllers
{
    public class MainController : ControllerBase
    {
        public IActionResult Index()
        {
            var sessionData = new SessionData
            {
                ServiceUser = ServiceUser
            };

            return View(sessionData);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
