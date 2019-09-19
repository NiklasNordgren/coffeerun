(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function(fn) {

    var DELAY = 2500,
      clicks = 0,
      timer = null;

    //Gold Challenge: Allowing Order Editing
    this.$element.on('click', 'input', function(event) {

      clicks++;
      var email = event.target.value;

      if (clicks === 1) {

        this.$element
          .find('[value="' + email + '"]')
          .closest('[data-coffee-order="checkbox"]')
          .css("background-color", "#d1d1e0");

        timer = setTimeout(function() {
          fn(email)
            .then(function() {
              this.removeRow(email);
            }.bind(this));
          clicks = 0;

        }.bind(this), DELAY);

      } else {

        clearTimeout(timer);
        //Fill form by using local datastore
        var ds = App.DataStore;
        var orderValues = ds.prototype.get(email);
        console.log(orderValues);

        $('[name=coffee]').val(orderValues['coffee']);
        $('[name=emailAddress]').val(orderValues['emailAddress']);
        $('[name=powerup]').val(orderValues['PowerUp']);
        $('[value=' + orderValues['size'] + ']').attr('checked', true);
        $('[name=flavor]').val(orderValues['flavor']);
        $('[name=strength]').val(orderValues['strength']);

        $('#strengthLevel').trigger('input');

        clicks = 0;
      }


    }.bind(this));

    this.$element.on("dblclick", function(e) {
      e.preventDefault();
    });

  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);

    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    //Silver Challenge: Color Coding by Flavor Shot
    switch (coffeeOrder.flavor) {
      case "caramel":
        $div.css("background-color", "#d9b3ff");
        break;
      case "almond":
        $div.css("background-color", "#b3ffcc");
        break;
      case "mocha":
        $div.css("background-color", "#ffcc99");
        break;
      default:
    }

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    //Bronze Challenge: Adding the Strength to theDescription
    var description = '[' + coffeeOrder.strength + 'x] ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }
    description += coffeeOrder.size + ' ';
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';


    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;

  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
