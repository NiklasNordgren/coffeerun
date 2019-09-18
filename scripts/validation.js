(function(window) {
  'use strict';
  var App = window.App || {};
  var Validation = {

    isCompanyEmail: function(email) {
      return /.+@test\.com$/.test(email);
    },
    isDecaf: function(coffeeOrder, coffeeStrength){
      return !(/decaf/i.test(coffeeOrder) && coffeeStrength > 20);
    }

  };
  App.Validation = Validation;
  window.App = App;
})(window);
