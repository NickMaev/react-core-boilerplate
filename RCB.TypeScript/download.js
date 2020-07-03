// This module allows you to download file using args --uri=[URI] --path=[FILEPATH]

var args = process.argv.slice(2).map(arg => {

    var splitted = arg.toLowerCase().split("=");
    if (splitted.length < 2) {
        return;
    }

    var key = splitted[0].replace(/\-/g, "");
    var value = splitted[1];

    return { key, value };
});

var fs = require('fs'),
    request = require('request');

var download = function (uri, path) {

    request.head(uri, function (err, res, body) {

        var splitted = path.split("/");

        var dirsToCreate = splitted.slice(0, splitted.length - 1);

        console.log(dirsToCreate.join("/"));

        fs.mkdir(dirsToCreate.join("/"), { recursive: true }, function () { });

        console.log("Downloading file '" + uri + "' to path " + "'" + path + "'...");

        request(uri)
            .pipe(fs.createWriteStream(path))
            .on('close', function () { console.log("Download complete."); });
    });

};

args.forEach((keyValuePair, index) => {
    switch (keyValuePair.key) {
        case "uri":
            var uri = keyValuePair.value;
            var path = args[index + 1].value;
            if (path) {
                if (!fs.existsSync(path)) {
                    download(uri, path);
                }
            }
            break;
    }
});