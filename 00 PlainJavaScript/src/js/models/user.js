(function (app) {
    app.User = function () {
        var name,
            lastName,
            id, 
            files;

        return {
            name: name,
            lastName: lastName,
            id: id,
            files: files
        };
    };
})(app);