module.exports = function(app) {

   var Controller = require('./../../Controller/Hub/Hub.controller.js');

   app.post('/API/Hub/Hub_Create', Controller.Hub_Create);
   app.post('/API/Hub/Hub_List', Controller.Hub_List);
   app.post('/API/Hub/Hub_SimpleList', Controller.Hub_SimpleList);
   app.post('/API/Hub/Hub_View', Controller.Hub_View);
 
};