(function(window) {
  'use strict';
  var App = window.App || {};
  var data;

  /*
    Silver Challenge: Making data Private
    Declaration of the property data in the outside scope.
    All instances of DataStore will now share the same property data.
  */

  function DataStore() {
    data = {};
  }

  DataStore.prototype.add = function(key, val) {
    data[key] = val;
  };

  DataStore.prototype.get = function(key) {
    return data[key];
  };

  DataStore.prototype.getAll = function() {
    return data;
  };

  DataStore.prototype.remove = function(key) {
    delete data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
