module.exports = function(app) {

   var Controller = require('../../Controller/Admin/AdminManagement.controller.js');

   
   app.post('/API/AdminManagement/User_Create', Controller.User_Create);
   app.post('/API/AdminManagement/User_Validate', Controller.User_Validate);

   app.post('/API/AdminManagement/Country_List', Controller.Country_List);
   app.post('/API/AdminManagement/State_List', Controller.State_List);
   app.post('/API/AdminManagement/City_List', Controller.City_List);

};