using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ReactCoreBoilerplate.Extensions.Microsoft.Extensions.DependencyInjection;
using ReactCoreBoilerplate.Infrastructure;
using ReactCoreBoilerplate.Services;
using Serilog;

namespace ReactCoreBoilerplate
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            Configuration.GetSection("AppSettings").Bind(AppSettings.Default);

            services.AddLogging(loggingBuilder =>
                loggingBuilder
                    .AddSerilog(dispose: true)
                    .AddAzureWebAppDiagnostics()
                );
            services.AddMvc();
            services.AddNodeServices();
            services.AddSpaPrerenderer();

            // Add your own services here.
            services.AddScoped<AccountService>();
            services.AddScoped<PersonService>();

            return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            // Build your own authorization system or use Identity.
            app.Use(async (context, next) =>
            {
                var accountService = (AccountService)context.RequestServices.GetService(typeof(AccountService));
                var verifyResult = accountService.Verify(context);
                if (!verifyResult.HasErrors)
                {
                    context.Items.Add(Constants.HttpContextServiceUserItemKey, verifyResult.Value);
                }
                await next.Invoke();
                // Do logging or other work that doesn't write to the Response.
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Main/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Main}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Main", action = "Index" });
            });
        }
    }
}
