using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace RCB.JavaScript.Infrastructure
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Exception was thrown during the request.");
                throw;
            }
        }
    }
}