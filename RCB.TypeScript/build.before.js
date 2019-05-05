var args = process.argv.slice(2);

const modeTypes = {
    PRODUCTION: "PRODUCTION",
    DEVELOPMENT: "DEVELOPMENT",
    CLEAN: "CLEAN"
};

var mode = modeTypes.DEVELOPMENT;

// Note that those paths are mentioned in '.csproj' file in project building scenarios.
var wwwrootDistDir = "wwwroot/dist";
var clientAppDistDir = "ClientApp/dist";
var productionBuildFileName = "production_build"; 
var productionBuildFilePath = wwwrootDistDir + "/" + productionBuildFileName; 

// Detect mode.
args.forEach(arg => {
    var splitted = arg.toLowerCase().split("=");
    if (splitted.length < 2) {
        return;
    }
    var param = splitted[0].replace(/\-/g, "");
    var value = splitted[1];

    switch (param) {
        case "mode":
            mode = modeTypes.PRODUCTION.toLowerCase() === value ? modeTypes.PRODUCTION : modeTypes.DEVELOPMENT;
    }
});

var fs = require("fs");
var fsAsync = fs.promises;
var rimraf = require("rimraf");

const exists = (path) => {
    return fs.existsSync(path);
};

const createEmptyFileAsync = async (filePath) => {
    let splitted = filePath.split("/");

    if (splitted.length > 1) {
        // Create intermediate directories if necessary.

        var dirsToCreate = splitted.slice(0, splitted.length - 1);
        await fsAsync.mkdir(dirsToCreate.join("/"), { recursive: true });
    }

    // Create empty file.
    fs.closeSync(fs.openSync(filePath, 'w'));
};

/**
 * Clean up unnecessary files.
 * */
const cleanUpAsync = async () => {

    console.log("Deleting compiled scripts...");

    await rimraf(wwwrootDistDir, (error) => {
        if (error) {
            console.log(error);
        }
    });

    await rimraf(clientAppDistDir, (error) => {
        if (error) {
            console.log(error);
        }
    });

};

const startAsync = async () => {

    console.log("======= build.before.js mode: " + mode + " =======");

    var doesProductionBuildFileExist = exists(productionBuildFilePath)

    var shouldClean =
        // Previous mode was "production".
        // So we need to clean up compiled scripts.
        doesProductionBuildFileExist ||
        // Or we need to clean up after development mode
        // to remove those unnecessary files.
        mode == modeTypes.PRODUCTION ||
        // Clean up only.
        mode == modeTypes.CLEAN;

    // Create indicator for next build operations.
    var shouldCreateProductionBuildFile = mode == modeTypes.PRODUCTION;
    
    if (shouldClean) {
        await cleanUpAsync();
    }

    setTimeout(async () => {
        if (shouldCreateProductionBuildFile) {
            await createEmptyFileAsync(productionBuildFilePath);
        }
    }, 1000);
};

startAsync();