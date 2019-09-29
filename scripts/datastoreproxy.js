(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function DataStoreProxy(url) {
    this.remoteDS = new App.RemoteDataStore(url);
    this.localDS = new App.DataStore();
    this.url = url;
  }

  DataStoreProxy.prototype.add = function(key, val) {
    var returnVal = this.remoteDS.add(key, val);
    if (returnVal !== null)
      return returnVal;
    else
      return this.localDS.add(key, val);
  };

  DataStoreProxy.prototype.get = function(key, cb) {
    var returnVal = this.remoteDS.get(key, cb);
    if (returnVal !== null)
      return returnVal;
    else
      return this.localDS.get(key, cb);
  };

  DataStoreProxy.prototype.getAll = function(cb) {
    var returnVal = this.remoteDS.getAll(cb);
    if (returnVal !== null)
      return returnVal;
    else
      return this.localDS.getAll();
  };

  DataStoreProxy.prototype.remove = function(key) {
    var returnVal = this.remoteDS.remove(key);
    if (returnVal !== null)
      return returnVal;
    else
      return this.localDS.remove(key);
  };

  App.DataStoreProxy = DataStoreProxy;
  window.App = App;
})(window);
