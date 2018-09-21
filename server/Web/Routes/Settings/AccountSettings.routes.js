module.exports = function(app) {

   var Controller = require('./../../Controller/Settings/AccountSettings.controller.js');

   app.post('/API/AccountSettings/Bank_AsyncValidate', Controller.Bank_AsyncValidate);
   app.post('/API/AccountSettings/Bank_Create', Controller.Bank_Create);
   app.post('/API/AccountSettings/Bank_List', Controller.Bank_List);
   app.post('/API/AccountSettings/Bank_Update', Controller.Bank_Update);
   app.post('/API/AccountSettings/Bank_Delete', Controller.Bank_Delete);
   app.post('/API/AccountSettings/Bank_SimpleList', Controller.Bank_SimpleList);

};
