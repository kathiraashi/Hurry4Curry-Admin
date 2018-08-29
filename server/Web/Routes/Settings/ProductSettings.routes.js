module.exports = function(app) {

   var Controller = require('./../../Controller/Settings/ProductSettings.controller.js');

   app.post('/API/ProductSettings/ProductVariant_AsyncValidate', Controller.ProductVariant_AsyncValidate);
   app.post('/API/ProductSettings/ProductVariant_Create', Controller.ProductVariant_Create);
   app.post('/API/ProductSettings/ProductVariant_List', Controller.ProductVariant_List);
   app.post('/API/ProductSettings/ProductVariant_Update', Controller.ProductVariant_Update);
   app.post('/API/ProductSettings/ProductVariant_Delete', Controller.ProductVariant_Delete);
   app.post('/API/ProductSettings/ProductVariant_SimpleList', Controller.ProductVariant_SimpleList);


   app.post('/API/ProductSettings/ProductUnitOfMeasure_AsyncValidate', Controller.ProductUnitOfMeasure_AsyncValidate);
   app.post('/API/ProductSettings/ProductUnitOfMeasure_Create', Controller.ProductUnitOfMeasure_Create);
   app.post('/API/ProductSettings/ProductUnitOfMeasure_List', Controller.ProductUnitOfMeasure_List);
   app.post('/API/ProductSettings/ProductUnitOfMeasure_Update', Controller.ProductUnitOfMeasure_Update);
   app.post('/API/ProductSettings/ProductUnitOfMeasure_Delete', Controller.ProductUnitOfMeasure_Delete);
   app.post('/API/ProductSettings/ProductUnitOfMeasure_SimpleList', Controller.ProductUnitOfMeasure_SimpleList);

};