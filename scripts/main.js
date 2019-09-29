(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var DataStoreProxy = App.DataStoreProxy;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var dataStoreProxy = new DataStoreProxy(SERVER_URL);

  var myTruck = new Truck('KITT', dataStoreProxy);
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  window.myTruck = myTruck;

  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function() {
          checkList.addRow.call(checkList, data);
        });
  });
  formHandler.addInputHandler(Validation.isCompanyEmail, Validation.isDecaf, dataStoreProxy);
  myTruck.printOrders(checkList.addRow.bind(checkList));

  console.log(formHandler);
})(window);
