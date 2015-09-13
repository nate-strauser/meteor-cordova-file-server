Package.describe({
    summary: "A local HTTP server for cordova applications to load files from the device file system.",
    name: "natestrauser:cordova-file-server",
    version: "0.1.2",
    git: "https://github.com/nate-strauser/meteor-cordova-file-server.git"
});

Package.on_use(function (api) {
	api.export('CordovaFileServer');
	api.versionsFrom("METEOR@0.9.2");
	api.use([
	    'deps',
	    'templating']
	  , 'web.cordova');

	Cordova.depends({
	    'com.rjfun.cordova.httpd': '0.9.2'
	});

    api.add_files(['client.js'], 'web.cordova');
});
