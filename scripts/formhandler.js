(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };


  //Silver Challenge: Showing the Value as the SliderChanges
  FormHandler.prototype.addSliderHandler = function() {
    console.log('Setting slider handler for form');

    var slider = $('#strengthLevel');
    var sliderLabels = $('label[for="' + slider[0].id + '"]');

    var displayValue = function(){};

    slider.on('input', function() {

      sliderLabels[1].innerText = this.value;

      let redValue = this.value * 2.55;
      let greenValue = 255 - (this.value * 2.55);

      sliderLabels[1].style = "color: rgb(" + redValue + "," + greenValue + ",0)";

    });

    //Trigger to set styles according to initial value
    $('#strengthLevel').trigger('input');

  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
