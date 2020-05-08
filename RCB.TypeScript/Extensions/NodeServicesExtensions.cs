using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RCB.TypeScript.Extensions
{
    /// <summary>
    /// Contains methods for adding the HTTPS support by <c>NodeServices</c>.
    /// </summary>
    public static class NodeServicesExtensions
    {
        /// <summary>
        /// Adds HTTPS support for <c>NodeServices</c>.
        /// </summary>
        /// <param name="options"><c>NodeServices</c> options.</param>
        /// <param name="configuration">Application configuration.</param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public static NodeServicesOptions AddHttps(
            this NodeServicesOptions options,
            IConfiguration configuration
            )
        {
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            options.EnvironmentVariables.Add("HttpsToHttpUrlTransform", "true");

            var serverUrls = GetServerUrls(configuration);

            var serverHttpsUrlsJson = JsonSerializer.Serialize(serverUrls.HttpsUrls);
            var serverHttpUrlsJson = JsonSerializer.Serialize(serverUrls.HttpUrls);

            options.EnvironmentVariables.Add("ServerHttpsUrls", serverHttpsUrlsJson);
            options.EnvironmentVariables.Add("ServerHttpUrls", serverHttpUrlsJson);

            return options;
        }

        /// <summary>
        /// Adds HTTPS support for <c>NodeServices</c>.
        /// </summary>
        /// <param name="services">Service collection.</param>
        /// <param name="configuration">Application configuration.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void AddNodeServicesWithHttps(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            services.AddNodeServices((opts) =>
            {
                opts.AddHttps(configuration);
            });
        }

        /// <summary>
        /// Adds HTTPS support for <c>NodeServices</c>.
        /// </summary>
        /// <param name="services">Service collection.</param>
        /// <param name="configuration">Application configuration.</param>
        /// <param name="setupAction"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void AddNodeServicesWithHttps(this IServiceCollection services, IConfiguration configuration, Action<NodeServicesOptions> setupAction)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            if (setupAction == null)
            {
                throw new ArgumentNullException(nameof(setupAction));
            }

            services.AddNodeServices((opts) =>
            {
                opts.AddHttps(configuration);
                setupAction(opts);
            });
        }

        private static (string[] HttpsUrls, string[] HttpUrls) GetServerUrls(IConfiguration configuration)
        {
            var httpsUrls = new List<string>();
            var httpUrls = new List<string>();

            var urlsSection = configuration.GetSection("URLS");

            if (urlsSection.Exists())
            {
                var urlStrings = urlsSection.Value.Split(";");
                foreach (var urlString in urlStrings)
                {
                    if (urlString.Contains("https"))
                    {
                        httpsUrls.Add(urlString);
                    }
                    else
                    {
                        httpUrls.Add(urlString);
                    }
                }
            }

            return (HttpsUrls: httpsUrls.ToArray(), HttpUrls: httpUrls.ToArray());
        }
    }
}