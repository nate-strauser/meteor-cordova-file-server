meteor-cordova-file-server
========================

A local HTTP server for cordova applications to load files from the device file system.


## Usage

This package will automatically start up a [cordova based http server](https://www.npmjs.com/package/cordova-plugin-httpd) that will server all files from the application filesystem.

See the included example app for cordova downloads and offline loading.

This package is a workaround of this issue https://github.com/meteor/meteor/issues/3799  Cordova based meteor apps can use cordova to download files to the filesystem, but they are unable to load files from "file://" based urls into the app.  
```

`<img src="file://something.png"/>` will fail even if the file exists

```

With this local http server running you can now load assets from the local filesystem

```
`<img src="http://127.0.0.1:8080/something.png"/>`

```

### CordovaFileServer

`CordovaFileServer` is exported from this package and available on the client.


`CordovaFileServer.httpd` is `cordova.plugins.CorHttpd`


`CordovaFileServer.httpUrl` is the local url - usually "http://127.0.0.1:8080/"


## TODO
* Option for manual start of server
* Ensure server is up on resume
* Extract secondary package from example that deals with file urls, downloads, etc

-----

## Version History


###v0.1
* Initial Release
