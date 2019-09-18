(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var emailsWithPowerUpsActive;



  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    emailsWithPowerUpsActive = [];

    this.coffeeOrder = "";
    this.coffeeStrength = 30;

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

      //Gold Challenge: Adding Achievements
      if (data.size === "coffee-zilla" && data.flavor !== "" && data.strength === "100") {
        $('#myModal').modal('show');
        $('#achievementYesButton').on('click', function(event) {
          emailsWithPowerUpsActive.push(data.emailAddress);
        });
      }

      //Remove email from emailsWithPowerUpsActive-array if an power up was chosen
      var index = emailsWithPowerUpsActive.indexOf(data.emailAddress);
      if (index > -1 && data.powerup !== "") {
        emailsWithPowerUpsActive.splice(index, 1);
      }

      this.reset();
      $('#powerUpDiv').css('display', 'none');
      $('#strengthLevel').trigger('input');
      this.elements[0].focus();
    });

    $('[type=email]').on('input', function() {
      for (let i = 0; i < emailsWithPowerUpsActive.length; i++) {
        if (emailsWithPowerUpsActive[i] === this.value) {
          $('#powerUpDiv').css('display', 'block');
          break;
        } else {
          $('#powerUpDiv').css('display', 'none');
        }
      }
    });

    //customization of reset
    this.$formElement.on('reset', function(event) {

      var slider = $('#strengthLevel');
      var sliderLabels = $('label[for="' + slider[0].id + '"]');
      sliderLabels[1].innerText = "30";
      sliderLabels[1].style = "color: rgb(" + 255 / 2 + "," + 255 / 2 + ",0)";

      $('#powerUpDiv').css('display', 'none');
      this.elements[0].focus();
    });


  };

  FormHandler.prototype.addInputHandler = function(fn, fn2) {
    console.log('Setting input handler for form');

    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!'
        event.target.setCustomValidity(message);
      }
    });

    // Silver Challenge: Custom Validation for Decaf
    $('[name="coffee"]').on('input', function(event) {

        var oldValues = [this.coffeeOrder, this.coffeeStrength];

        this.coffeeOrder = event.target.form.coffee.value;
        this.coffeeStrength = parseInt(event.target.form.strength.value);
        var message = '';
        if (fn2(this.coffeeOrder, this.coffeeStrength)) {
          event.target.setCustomValidity('');
        } else {
          message = this.coffeeOrder + ' ' + this.coffeeStrength + ' invalid Caffeine rating! (coffeeOrderField)'
          event.target.setCustomValidity(message);
        }

        var newValues = [this.coffeeOrder, this.coffeeStrength];

        if(oldValues[0] !== newValues[0] || oldValues[1] !== newValues[1]){
          $('[name="strength"]').trigger('input');
        }

      }.bind(this));

      $('[name="strength"]').on('input', function(event) {

          var oldValues = [this.coffeeOrder, this.coffeeStrength];

          this.coffeeOrder = event.target.form.coffee.value;
          this.coffeeStrength = parseInt(event.target.form.strength.value);
          var message = '';
          if (fn2(this.coffeeOrder, this.coffeeStrength)) {
            event.target.setCustomValidity('');
          } else {
            message = this.coffeeOrder + ' ' + this.coffeeStrength + ' invalid Caffeine rating! (coffeeOrderField)'
            event.target.setCustomValidity(message);
          }

          var newValues = [this.coffeeOrder, this.coffeeStrength];

          if(oldValues[0] !== newValues[0] || oldValues[1] !== newValues[1]){
            $('[name="coffee"]').trigger('input');
          }

        }.bind(this));

  };

  //Silver Challenge: Showing the Value as the SliderChanges
  FormHandler.prototype.addSliderHandler = function() {
    console.log('Setting slider handler for form');

    var slider = $('#strengthLevel');
    var sliderLabels = $('label[for="' + slider[0].id + '"]');

    slider.on('input', function() {

      sliderLabels[1].innerText = this.value;

      let redValue = this.value * 2.55;
      let greenValue = 255 - (this.value * 2.55);

      sliderLabels[1].style = "color: rgb(" + redValue + "," + greenValue + ",0)";

    });

    //Trigger to set styles according to initial value
    slider.trigger('input');

  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
