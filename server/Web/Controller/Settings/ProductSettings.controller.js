var CryptoJS = require("crypto-js");
var SettingsModel = require('./../../models/Settings/Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');





//  Product Variant Async Validate 
   exports.ProductVariant_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_Variant || ReceivingData.Product_Variant === '' ) {
         res.status(400).send({Status: false, Message: "Variant can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductVariantsSchema.findOne({'Product_Variant': { $regex : new RegExp("^" + ReceivingData.Product_Variant + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variants Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Product Variants!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   
// Product Variant Create
   exports.ProductVariant_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_Variant || ReceivingData.Product_Variant === '' ) {
         res.status(400).send({Status: false, Message: "Product Variant can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_ProductVariant= new SettingsModel.ProductVariantsSchema({
            Product_Variant: ReceivingData.Product_Variant, 
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_ProductVariant.save(function(err, result) { // Product Variant Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Creation Query Error', 'ProductSettings.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Product Variant!."});
            } else {
               SettingsModel.ProductVariantsSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name'] })
                  .exec(function(err_1, result_1) { // Product Variant FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Find Query Error', 'ProductSettings.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Product Variant!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };
// Product Variant List
   exports.ProductVariant_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductVariantsSchema
            .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name'] })
            .populate({ path: 'Last_Modified_By', select: ['Name'] })
            .exec(function(err, result) { // Product Variant FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product Variant!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Product Variant Simple List
   exports.ProductVariant_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductVariantsSchema.find({'If_Deleted': false }, { Product_Variant : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Product Variant FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product Variant!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Product Variant Update
   exports.ProductVariant_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_Variant_Id || ReceivingData.Product_Variant_Id === '' ) {
         res.status(400).send({Status: false, Message: "Product Variant Details can not be empty" });
      }else if(!ReceivingData.Product_Variant || ReceivingData.Product_Variant === '' ) {
         res.status(400).send({Status: false, Message: "Product Variant can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductVariantsSchema.findOne({'_id': ReceivingData.Product_Variant_Id}, {}, {}, function(err, result) { // Product Variant FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant FindOne Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product Variant!."});
            } else {
               if (result !== null) {
                  result.Product_Variant = ReceivingData.Product_Variant;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) { // Product Variant Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Update Query Error', 'ProductSettings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Product Variant!."});
                     } else {
                        SettingsModel.ProductVariantsSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name'] })
                           .exec(function(err_2, result_2) { // Product Variant FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Find Query Error', 'ProductSettings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Product Variant!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Product Variant Details can not be valid!" });
               }
            }
         });
      }
   };
// Product Variant Delete
   exports.ProductVariant_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_Variant_Id || ReceivingData.Product_Variant_Id === '' ) {
         res.status(400).send({Status: false, Message: "Product Variant Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: " User Details can not be empty" });
      }else {
         SettingsModel.ProductVariantsSchema.findOne({'_id': ReceivingData.Product_Variant_Id}, {}, {}, function(err, result) { // Product Variant FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant FindOne Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product Variant!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.User_Id = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) { // Industry Type Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Delete Query Error', 'ProductSettings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Product Variant!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Product Variant Details can not be valid!" });
               }
            }
         });
      }
   };



//  Product UnitOfMeasure Async Validate 
   exports.ProductUnitOfMeasure_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_UnitOfMeasure || ReceivingData.Product_UnitOfMeasure === '' ) {
         res.status(400).send({Status: false, Message: "Variant can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductUnitOfMeasuresSchema.findOne({'Product_UnitOfMeasure': { $regex : new RegExp("^" + ReceivingData.Product_UnitOfMeasure + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasures Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Product UnitOfMeasures!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };   
// Product UnitOfMeasure Create
   exports.ProductUnitOfMeasure_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_UnitOfMeasure || ReceivingData.Product_UnitOfMeasure === '' ) {
         res.status(400).send({Status: false, Message: "Product UnitOfMeasure can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_ProductUnitOfMeasure= new SettingsModel.ProductUnitOfMeasuresSchema({
            Product_UnitOfMeasure: ReceivingData.Product_UnitOfMeasure, 
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_ProductUnitOfMeasure.save(function(err, result) { // Product UnitOfMeasure Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Creation Query Error', 'ProductSettings.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Product UnitOfMeasure!."});
            } else {
               SettingsModel.ProductUnitOfMeasuresSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name'] })
                  .exec(function(err_1, result_1) { // Product UnitOfMeasure FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Find Query Error', 'ProductSettings.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };
// Product UnitOfMeasure List
   exports.ProductUnitOfMeasure_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductUnitOfMeasuresSchema
            .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name'] })
            .populate({ path: 'Last_Modified_By', select: ['Name'] })
            .exec(function(err, result) { // Product UnitOfMeasure FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Product UnitOfMeasure Simple List
   exports.ProductUnitOfMeasure_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductUnitOfMeasuresSchema.find({'If_Deleted': false }, { Product_UnitOfMeasure : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Product UnitOfMeasure FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Product UnitOfMeasure Update
   exports.ProductUnitOfMeasure_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_UnitOfMeasure_Id || ReceivingData.Product_UnitOfMeasure_Id === '' ) {
         res.status(400).send({Status: false, Message: "Product UnitOfMeasure Details can not be empty" });
      }else if(!ReceivingData.Product_UnitOfMeasure || ReceivingData.Product_UnitOfMeasure === '' ) {
         res.status(400).send({Status: false, Message: "Product UnitOfMeasure can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductUnitOfMeasuresSchema.findOne({'_id': ReceivingData.Product_UnitOfMeasure_Id}, {}, {}, function(err, result) { // Product UnitOfMeasure FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure FindOne Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
            } else {
               if (result !== null) {
                  result.Product_UnitOfMeasure = ReceivingData.Product_UnitOfMeasure;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) { // Product UnitOfMeasure Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Update Query Error', 'ProductSettings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Product UnitOfMeasure!."});
                     } else {
                        SettingsModel.ProductUnitOfMeasuresSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name'] })
                           .exec(function(err_2, result_2) { // Product UnitOfMeasure FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Find Query Error', 'ProductSettings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Product UnitOfMeasure Details can not be valid!" });
               }
            }
         });
      }
   };
// Product UnitOfMeasure Delete
   exports.ProductUnitOfMeasure_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Product_UnitOfMeasure_Id || ReceivingData.Product_UnitOfMeasure_Id === '' ) {
         res.status(400).send({Status: false, Message: "Product UnitOfMeasure Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: " User Details can not be empty" });
      }else {
         SettingsModel.ProductUnitOfMeasuresSchema.findOne({'_id': ReceivingData.Product_UnitOfMeasure_Id}, {}, {}, function(err, result) { // Product UnitOfMeasure FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure FindOne Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.User_Id = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) { // Industry Type Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Delete Query Error', 'ProductSettings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Product UnitOfMeasure!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Product UnitOfMeasure Details can not be valid!" });
               }
            }
         });
      }
   };