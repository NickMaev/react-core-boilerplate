using System;
using Microsoft.Extensions.DependencyInjection;

namespace ReactCoreBoilerplate.Extensions
{
    namespace Microsoft.Extensions.DependencyInjection
    {
        public static class ServiceCollectionExtensions
        {
            /// <summary>
            /// Adds a lazily initialized scoped service of the type specified in <typeparamref name="TService"/> to the
            /// specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service to add.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddScopedLazy<TService>(this IServiceCollection services)
                where TService : class
            {
                return services
                    .AddScoped<TService>()
                    .AddScoped(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized scoped service of the type specified in <typeparamref name="TService"/> with a
            /// factory specified in <paramref name="implementationFactory"/> to the specified
            /// <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationFactory">The factory that creates the service.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddScopedLazy<TService>(
                this IServiceCollection services,
                Func<IServiceProvider, TService> implementationFactory)
                where TService : class
            {
                return services
                    .AddScoped(implementationFactory)
                    .AddScoped(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized scoped service of the type specified in <typeparamref name="TService"/> with an
            /// implementation type specified in <typeparamref name="TImplementation"/> to the specified
            /// <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <typeparam name="TImplementation">The type of the implementation to use.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddScopedLazy<TService, TImplementation>(this IServiceCollection services)
                where TService : class
                where TImplementation : class, TService
            {
                return services
                    .AddScoped<TService, TImplementation>()
                    .AddScoped(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized scoped service of the type specified in <typeparamref name="TService"/> with an
            /// implementation type specified in <typeparamref name="TImplementation"/> using the factory specified in
            /// <paramref name="implementationFactory"/> to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <typeparam name="TImplementation">The type of the implementation to use.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationFactory">The factory that creates the service.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddScopedLazy<TService, TImplementation>(
                this IServiceCollection services,
                Func<IServiceProvider, TImplementation> implementationFactory)
                where TService : class
                where TImplementation : class, TService
            {
                return services
                    .AddScoped<TService, TImplementation>()
                    .AddScoped(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized singleton service of the type specified in <typeparamref name="TService"/> to the
            /// specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddSingletonLazy<TService>(this IServiceCollection services)
                where TService : class
            {
                return services
                    .AddSingleton<TService>()
                    .AddSingleton(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized singleton service of the type specified in <typeparamref name="TService"/> with a
            /// factory specified in <paramref name="implementationFactory"/> to the specified
            /// <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationFactory">The factory that creates the service.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddSingletonLazy<TService>(
                this IServiceCollection services,
                Func<IServiceProvider, TService> implementationFactory)
                where TService : class
            {
                return services
                    .AddSingleton(implementationFactory)
                    .AddSingleton(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized singleton service of the type specified in <typeparamref name="TService"/> with
            /// an instance specified in implementationInstance to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationInstance">The implementation instance.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddSingletonLazy<TService>(
                this IServiceCollection services,
                TService implementationInstance)
                where TService : class
            {
                return services
                    .AddSingleton<TService>()
                    .AddSingleton(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized singleton service of the type specified in <typeparamref name="TService"/> with
            /// an implementation type specified in <typeparamref name="TImplementation"/> to the specified
            /// <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <typeparam name="TImplementation">The type of the implementation to use.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddSingletonLazy<TService, TImplementation>(this IServiceCollection services)
                where TService : class
                where TImplementation : class, TService
            {
                return services
                    .AddSingleton<TService, TImplementation>()
                    .AddSingleton(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized singleton service of the type specified in <typeparamref name="TService"/> with an implementation
            /// type specified in <typeparamref name="TImplementation"/> using the factory specified in <paramref name="implementationFactory"/>
            /// to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <typeparam name="TImplementation">The type of the implementation to use.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationFactory">The factory that creates the service.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddSingletonLazy<TService, TImplementation>(
                this IServiceCollection services,
                Func<IServiceProvider, TImplementation> implementationFactory)
                where TService : class
                where TImplementation : class, TService
            {
                return services
                    .AddSingleton<TService, TImplementation>(implementationFactory)
                    .AddSingleton(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized transient service of the type specified in <typeparamref name="TService"/> to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddTransientLazy<TService>(this IServiceCollection services)
                where TService : class
            {
                return services
                    .AddTransient<TService>()
                    .AddTransient(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized transient service of the type specified in <typeparamref name="TService"/> with a factory specified
            /// in <paramref name="implementationFactory"/> to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationFactory">The factory that creates the service.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddTransientLazy<TService>(
                this IServiceCollection services,
                Func<IServiceProvider, TService> implementationFactory)
                where TService : class
            {
                return services
                    .AddTransient(implementationFactory)
                    .AddTransient(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized transient service of the type specified in <typeparamref name="TService"/> with an implementation
            /// type specified in <typeparamref name="TImplementation"/> to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <typeparam name="TImplementation">The type of the implementation to use.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddTransientLazy<TService, TImplementation>(this IServiceCollection services)
                where TService : class
                where TImplementation : class, TService
            {
                return services
                    .AddTransient<TService, TImplementation>()
                    .AddTransient(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }

            /// <summary>
            /// Adds a lazily initialized transient service of the type specified in <typeparamref name="TService"/> with an implementation
            /// type specified in <typeparamref name="TImplementation"/> using the factory specified in <paramref name="implementationFactory"/>
            /// to the specified <see cref="IServiceCollection"/>.
            /// </summary>
            /// <typeparam name="TService">The type of the service.</typeparam>
            /// <typeparam name="TImplementation">The type of the implementation to use.</typeparam>
            /// <param name="services">The <see cref="IServiceCollection"/> to add the service to.</param>
            /// <param name="implementationFactory">The factory that creates the service.</param>
            /// <returns>A reference to this instance after the operation has completed.</returns>
            public static IServiceCollection AddTransientLazy<TService, TImplementation>(
                this IServiceCollection services,
                Func<IServiceProvider, TImplementation> implementationFactory)
                where TService : class
                where TImplementation : class, TService
            {
                return services
                    .AddTransient(implementationFactory)
                    .AddTransient(x => new Lazy<TService>(() => x.GetRequiredService<TService>()));
            }
        }
    }
}
