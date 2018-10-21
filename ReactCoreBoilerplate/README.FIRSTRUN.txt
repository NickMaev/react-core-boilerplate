The project contains a fake authorization system, so you can change it to Identity or another.
More info: https://github.com/NickMaev/react-core-boilerplate

# Installation
	1. At the first run you must close the project if it runs in Visual Studio or another IDE. 
	Open project's folder in console and run command `npm install`.
	2. Type `npm run build:dev` for development, it will compile the main and vendor bundle.
	3. Run project.

# Modify WebPack vendor config
	If you modify the WebPack vendor config, you must manually recompile the vendor bundle.
	Type `npm run build:dev` to do this.

# Known issues
	If you have "HTTP Error 502.5", you must install the latest "ASP.NET Core SDK" and "Runtime and Hosting Bundle" 
	using this link: https://www.microsoft.com/net/download/dotnet-core/2.1


# Other issues
	If you will have any issue with project starting, you can see errors in logs ("/logs" directory).