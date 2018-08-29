module.exports = function(app) {

   var Controller = require('./../../Controller/Hub/Hub.controller.js');

   app.post('/API/Hub/Hub_UserName_AsyncValidate', Controller.Hub_UserName_AsyncValidate);
   app.post('/API/Hub/Hub_PhoneNumber_AsyncValidate', Controller.Hub_PhoneNumber_AsyncValidate);

   app.post('/API/Hub/Hub_Create', Controller.Hub_Create);
   app.post('/API/Hub/Hub_List', Controller.Hub_List);
   app.post('/API/Hub/Hub_View', Controller.Hub_View);
   app.post('/API/Hub/Hub_Update', Controller.Hub_Update);
 
};