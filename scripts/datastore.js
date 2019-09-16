(function(window) {
  'use strict';
  var App = window.App || {};
  var data = {};

  /*
    Silver Challenge: Making data Private
    Declaration of the property data in the outside scope.
    All instances of DataStore will now share the same property data.
  */

  function DataStore() {
    this.data = {};
  }

  DataStore.prototype.add = function(key, val) {
    this.data[key] = val;
  };

  DataStore.prototype.get = function(key) {
    return this.data[key];
  };

  DataStore.prototype.getAll = function() {
    return this.data;
  };

  DataStore.prototype.remove = function(key) {
    delete this.data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
