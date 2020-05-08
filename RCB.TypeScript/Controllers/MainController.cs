using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RCB.TypeScript.Infrastructure;

namespace RCB.TypeScript.Controllers
{
    public class MainController : ControllerBase
    {
        public IActionResult Index()
        {
            var webSessionContext = new WebSessionContext
            {
                Ssr = new SsrSessionData
                {
                    Cookie = string.Join(", ", Request.Cookies.Select(x => $"{x.Key}={x.Value};"))
                },
                Isomorphic = new IsomorphicSessionData
                {
                    ServiceUser = ServiceUser
                }
            };

            return View(webSessionContext);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}