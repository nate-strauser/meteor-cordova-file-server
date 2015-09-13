CordovaFileServer = {};
if (Meteor.isClient && Meteor.isCordova) {
    CordovaFileServer.httpd = null;
    CordovaFileServer.httpUrl = null;

    function startServer(wwwroot) {
        //console.log('starting server at ' + wwwroot);
        if (CordovaFileServer.httpd) {
            // before start, check whether its up or not
            CordovaFileServer.httpd.getURL(function(url) {
                if (url.length > 0) {
                    CordovaFileServer.httpUrl = url;
                    //console.log("server is up: <a href='" + url + "' target='_blank'>" + url + "</a>");
                    // httpd.getLocalPath(function(path) {
                    //   console.log("localPath: " + path);
                    // });
                } else {
                    /* wwwroot is the root dir of web server, it can be absolute or relative path
                     * if a relative path is given, it will be relative to cordova assets/www/ in APK.
                     * "", by default, it will point to cordova assets/www/, it's good to use 'htdocs' for 'www/htdocs'
                     * if a absolute path is given, it will access file system.
                     * "/", set the root dir as the www root, it maybe a security issue, but very powerful to browse all dir
                     */
                    var options = {
                        'www_root': wwwroot,
                        'port': 8080,
                        'localhost_only': false
                    };
                    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.CordovaFileServer)
                      options = _.extend(options, Meteor.settings.public.CordovaFileServer);

                    CordovaFileServer.httpd.startServer(options, function(url) {
                        CordovaFileServer.httpUrl = url;
                        // if server is up, it will return the url of http://<server ip>:port/
                        // the ip is the active network connection
                        // if no wifi or no cell, "127.0.0.1" will be returned.
                        //console.log("server is started: <a href='" + url + "' target='_blank'>" + url + "</a>");
                        // httpd.getLocalPath(function(path) {
                        //   console.log("localPath: " + path);
                        // });

                    }, function(error) {
                        console.log('failed to start cordova file server: ' + error);
                    });
                }

            });
        } else {
            console.log('CorHttpd plugin not available/ready.');
        }
    }

    Meteor.startup(function() {
        CordovaFileServer.httpd = (cordova && cordova.plugins && cordova.plugins.CorHttpd) ? cordova.plugins.CorHttpd : null;
        if (CordovaFileServer.httpd) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                // console.log('fileSystem');
                // console.log(fileSystem);
                var path = fileSystem.root.nativeURL.replace("file://", "");
                // console.log(path);
                startServer(path);
            });
        }
    });
}
