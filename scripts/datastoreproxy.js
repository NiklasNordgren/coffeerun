(function(window) {
  'use strict';
  var App = window.App || {};

  function DataStoreProxy(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.remoteDS = new App.RemoteDataStore(url);
  }

  DataStoreProxy.prototype.add = function(key, val) {
    return this.remoteDS.add(key, val);
  };

  DataStoreProxy.prototype.get = function(key, cb) {
    return this.remoteDS.get(key, cb);
  };

  DataStoreProxy.prototype.getAll = function() {
    return this.remoteDS.getAll();
  };

  DataStoreProxy.prototype.remove = function(key) {
    return this.remoteDS.remove(key);
  };

  App.DataStoreProxy = DataStoreProxy;
  window.App = App;
})(window);
