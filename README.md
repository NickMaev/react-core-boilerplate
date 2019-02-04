# Description
React Core Boilerplate is a starting point for building universal/isomorphic React applications with ASP.NET Core 2.
It bases on the TypeScript and other libraries for creating powerfull web applications.
All works fine out of the box. Also is helpful for newbies.
The project contains a fake authorization system, so you can change it to Identity or another.
Project template available on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=NikolayMaev.ReactCoreBoilerplate).
# Screenshots
![](https://habrastorage.org/webt/ro/22/ze/ro22zedzgeq0u0oidbxfjqzv3pm.png)
![](https://habrastorage.org/webt/zi/uw/th/ziuwthv_kafkor5tz00x8xwvgz8.png)
![](https://habrastorage.org/webt/9a/7k/f8/9a7kf8jlwhmc5hrrr4cwxuecxeg.png)
# Changes
##### v. 1.5.4 (2019-02-04)
* Added some minor features.
* Bug fixes: `collapsing of the Bootstrap navigation bar`, `fixed controller and frontend's service in person update case`.
* Updated dependencies.
##### v. 1.5.3 (2018-12-04)
* Added polyfills for supporting IE9, IE11: `@babel/polyfill`, `custom-event-polyfill`.
* Updated dependencies.
##### v. 1.5.2 (2018-12-01)
* Added fulltext live search to example.
* Added Webpack plugins: `case-sensitive-paths-webpack-plugin`, `react-dev-utils`
* Added plugins with examples:
`awesome-debounce-promise` to prevent doing frequent queries in live search, `formik` to create forms in React without tears.
* Fixed some functional and text errors.
##### v. 1.5.0(1) (2018-11-07)
* Added `hosting.json` which contains hosting settings and will be used in the production build.
* Added `bind-decorator` package and examples with it.
* Speeded up of WebPack bundle building.
* Updated domain-wait package. This update allows you to prevent calling for isomorphic fetch requests twice (in server prerender and after it - on client side).
* Updated redux-thunk package. 
* Added new React components to prevent a headake when you build web applications: `ModalComponent`, `Input`, `MultiSelect`, `Form`. This components are used in examples.
##### v. 1.4.5 (2018-11-02)
* Added new feature allows web application to share browser's cookie with NodeServices. Now SSR generates HTML code for authenticated users and makes authenticated isomorphic requests. 
* Added method `sendFormData` to the `ServiceBase.ts` which allows you to upload files to the server.
##### v. 1.3.5 (2018-10-26)
* Updated NPM packages: `react`, `redux`, `react-router`. 
* Replaced due to deprecation `react-router-redux` by the new `connected-react-router`.
* Fixed `Loader` component which had trouble in some cases.
##### v. 1.3.2 (2018-10-25)
* Removed unused NPM packages.
* Added package-lock.json. 
* Fixed project.
##### v. 1.3.0 (2018-10-22)
* Updated React package. 
* Added the `AppComponent` component which allows you to do the "force update" of the "stucked" components (for ex. `Loader` component in `LoginPage`). 
* Added Serilog logger which log into files (`logs/` directory) and also into Azure Cloud Provider.
##### v. 1.2.1 (2018-10-20)
* Fixed `Loader` component which worked incorrect with SSR in some cases.
##### v. 1.2.0 (2018-10-18)
* Updated dependency of "ASP.NET Core" package due to vulnerability.
* Added feature which allows you to pass JSON objects to URL query for GET and DELETE methods.
##### v. 1.1.0 (2018-10-16)
* Fixed `AppRoute` component. Solved issue with passing params to components from React Router. If you want to fix it manually, see the commit [here](https://github.com/NickMaev/react-core-boilerplate/commit/34bef1c42879e73985633275c8fb499415c60d8a).

# Usage

## Installation
1. Install latest .NET Core **SDK** and **Runtime** by [link](https://dotnet.microsoft.com/download).
2. Install of the latest stable [Node.js](https://nodejs.org/en/).
3. At the first run you must close project if it runs in Visual Studio or another IDE. 
Open project's folder in console and run command `npm install`.
4. Type `npm run build:dev` for development, it will compile the main and vendor bundle.
5. Run project.

## Modify WebPack vendor config
If you modify the WebPack vendor config, you must manually recompile the vendor bundle.
Type `npm run build:dev` to do this.

# Elements
Third-party libraries:
* [TypeScript](https://www.typescriptlang.org/) - all frontend based on TypeScript.
* [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) - Webpack plugin that runs typescript type checker on a separate process.
* [React](https://reactjs.org/) - main library which worked as isomorphic.
* [React Router](https://github.com/ReactTraining/react-router) - router for React.
* [React-Helmet](https://github.com/nfl/react-helmet) - isomorphic SEO helpers.
* [Redux](https://redux.js.org/) - store.
* [Connected React Router](https://github.com/supasate/connected-react-router) - Redux binding for React Router.
* [SASS](https://sass-lang.com/) - CSS preprocessor.
* [WebPack 4](https://webpack.js.org/) - bundler.
* [Axios](https://github.com/axios/axios) - isomorphic fetch util.
* [ts-nameof](https://github.com/dsherret/ts-nameof) - allows you to use type-safe names of inputs in form.
* [json-to-url](https://www.npmjs.com/package/json-to-url) - allows you to pass JSON objects to URL query for GET and DELETE methods.
* [Serilog](https://serilog.net/) - allows you to log into files (`logs/` directory) and also into Azure Cloud Provider.

Own libraries / fixed forks:
* [domain-wait](https://github.com/NickMaev/domain-wait) - domain-task replacement with async/await support and new features.
* [NVal](https://github.com/NickMaev/NVal) - jQuery-validation-like Vanilla JS validator.
* [NVal-Tippy](https://github.com/NickMaev/NVal-Tippy) - Vanilla JS validation with awesome tooltips.
* [NSerializeJson](https://github.com/NickMaev/NSerializeJson) - flexible form to JSON serializer based on Vanilla JS.
* [bootstrap3-native](https://github.com/NickMaev/bootstrap3-native) - fixed [bootstrap.native](https://github.com/thednp/bootstrap.native) with types.

# Issues
## Known issues

* **HTTP Error 500**

Probably you don't have the latest version of Node.js.

* **HTTP Error 502.5**

You must install the latest "ASP.NET Core SDK" and "Runtime and Hosting Bundle" using this link: https://www.microsoft.com/net/download/dotnet-core/2.1
* **HTTP error 500 when hosted in Azure**

Set the "WEBSITE_NODE_DEFAULT_VERSION" to 6.11.2 in the "app settings" in Azure.
## Other issues
* If you will have any issue with project starting, you can see errors in logs ("/logs" directory). Please, do this before the open an issue on GitHub.

# Project structure:
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
|   |           AppComponent.tsx	# Allows you to make the "force update" of the stucked components.
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
|       ExceptionMiddleware.cs		# Middleware which allows you to catch exceptions during the runtime.
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
