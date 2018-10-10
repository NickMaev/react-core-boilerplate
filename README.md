Project template available on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=NikolayMaev.ReactCoreBoilerplate).

# Description
React Core Boilerplate is a starting point for building universal/isomorphic React applications with ASP.NET Core 2.
It bases on the TypeScript and other libraries for creating powerfull web applications.
All work fine out of the box. Also helpful for newbies.

# Usage

## Installation
1. At the first run you must close project if it runs in Visual Studio or another IDE. 
Open project's folder in console and run command `npm install`.
2. Type `npm run build:dev` for development, it will compile the main and vendor bundle.
3. Run project.

## Modify WebPack vendor config
If you modify the WebPack vendor config, you must manually recompile the vendor bundle.
Type `npm run build:dev` to do this.

# Elements
Third-party libraries:
* [TypeScript](https://www.typescriptlang.org/) - all frontend based on TypeScript.
* [React](https://reactjs.org/) - main library which worked as isomorphic.
* [React-Helmet](https://github.com/nfl/react-helmet) - isomorphic SEO helpers.
* [Redux](https://redux.js.org/) - store.
* [SASS](https://sass-lang.com/) - CSS preprocessor.
* [WebPack 4](https://webpack.js.org/) - bundler.
* [Axios](https://github.com/axios/axios) - isomorphic fetch util.
* [ts-nameof](https://github.com/dsherret/ts-nameof) - allows you to use type-safe names of inputs in form.

Own libraries / fixed forks:
* [domain-wait](https://github.com/NickMaev/domain-wait) - domain-task replacement with async/await support.
* [NVal](https://github.com/NickMaev/NVal) - jQuery-validation-like Vanilla JS validator.
* [NVal-Tippy](https://github.com/NickMaev/NVal-Tippy) - Vanilla JS validation with awesome tooltips.
* [NSerializeJson](https://github.com/NickMaev/NSerializeJson) - flexible form to JSON serializer based on Vanilla JS.
* [bootstrap3-native](https://github.com/NickMaev/bootstrap3-native) - fixed [bootstrap.native](https://github.com/thednp/bootstrap.native) with types.

Structure:
```shell
|   .gitignore
|   AppSettings.cs
|   appsettings.Development.json
|   appsettings.json
|   Constants.cs					# Constants includes fake authorization cookie keys.
|   package.json					# NPM Package file.
|   Program.cs						# Application entry point.
|   ReactSSR.WebApp.csproj			# Visual Studio 2017 project file.
|   ReactSSR.WebApp.csproj.user
|   README.md
|   Startup.cs
|   tsconfig.json					# TypeScript config file.
|   webpack.config.js				# Server and client-side rendering WebPack configurations.
|   webpack.config.vendor.js		# Server and client-side rendering WebPack Vendor configurations.
|   
+---ClientApp
|   |   boot-client.tsx				# Frontend client-side entry point.
|   |   boot-server.tsx				# Frontend SSR entry point.
|   |   configureStore.ts			# Redux store definitions.
|   |   global.d.ts					# Global types definitions (e.g. ts-nameof, *.png, etc.)
|   |   Globals.ts					# Incapsulates global isomorphic data (e.g. authorization data).
|   |   routes.tsx					# Routes.
|   |   Ui.ts						# Incapsulates UI helpers initialization (e.g. tooltips).
|   |   utils.ts					# Helpful utils.
|   |   
|   +---components					# Components (not pages).
|   |   +---person
|   |   |       PersonEditor.tsx	# Example component.
|   |   |       
|   |   \---shared					# Shared components.
|   |           AppRoute.tsx		# Component for building routes with more than one layouts.
|   |           ErrorBoundary.tsx	# Component based on the error boundary pattern.
|   |           Footer.tsx			# Footer for authorized layout.
|   |           Loader.tsx			# Loader component.
|   |           PagingBar.tsx		# Paging component.
|   |           TopMenu.tsx			# Top menu component for authorized layout.
|   |           
|   +---images
|   |       logo.png				# Boilerplate logo.
|   |       
|   +---layouts						# Layouts.
|   |       AuthorizedLayout.tsx
|   |       GuestLayout.tsx
|   |       
|   +---models						# Models which used in application.
|   |       ILoginModel.ts
|   |       IPersonModel.ts
|   |       IServiceUser.ts
|   |       ISessionData.ts
|   |       Result.ts				# Result pattern realization.
|   |       
|   +---pages						# Application pages.
|   |       ExamplePage.tsx
|   |       HomePage.tsx
|   |       LoginPage.tsx
|   |       
|   +---services					# Isomorphic JS services which incapsulate the fetch logic.
|   |       AccountService.ts		# Fake authorization service.
|   |       PersonService.ts		# Example service.
|   |       ServiceBase.ts			# Isomorphic service base.
|   |       
|   +---store						# Redux stores.
|   |       index.ts				# Stores definition.
|   |       LoginStore.ts			
|   |       PersonStore.ts			# Example store definition.
|   |       
|   \---styles
|           authorizedLayout.scss	# Styles for authorized layout.
|           guestLayout.scss		# Styles for guest layout.
|           loader.scss				# Loader component styles.
|           main.scss				# Common styles.
|           preloader.css			# First run preloader styles.
|           
+---Controllers
|       AccountController.cs		# Fake accounts controller.
|       ControllerBase.cs			# Incapsulates fake authorization properties.
|       MainController.cs			# Entry point controller.
|       PersonController.cs			# Example controller.
|       
+---Extensions
|       ServiceCollectionExtensions.cs	# Incapsulates methods which allow you to define lazy DI-containers.
|       
+---Infrastructure					# Folder for the infranstructure classes.
|       Result.cs					# Result pattern realization on the server-side.
|       ServiceBase.cs				# Facade as service pattern base class.
|       
+---Models
|       LoginModel.cs				# Model for fake authorization.
|       PersonModel.cs				# Model for the example.
|       ServiceUser.cs				
|       SessionData.cs				# Isomorphic session data.
|        
+---Services						# Contains server-side services implementations.
|       AccountService.cs			# Fake accounts service.
|       PersonService.cs			# Example service implementation.
|       
+---Views
|   |   _ViewImports.cshtml
|   |   _ViewStart.cshtml
|   |   
|   +---Main
|   |       Index.cshtml			# Entry-point which incapsulates root app HTML container.
|   |       
|   \---Shared
|           Error.cshtml
|           
\---wwwroot							# Root folder where will be located client-side bundles.
        favicon.ico
        
```
