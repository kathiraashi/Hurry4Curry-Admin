var CryptoJS = require("crypto-js");
var SettingsModel = require('./../../Models/Settings/Settings.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');





//  Bank Async Validate 
   exports.Bank_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Account_No || ReceivingData.Account_No === '' ) {
         res.status(400).send({Status: false, Message: "Account No can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.BanksSchema.findOne({ Creator_Type: 'Admin',  'Account_No': { $regex : new RegExp("^" + ReceivingData.Account_No + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Banks Find Query Error', 'AccountSettings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Banks!."});
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
// Bank Create
   exports.Bank_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Account_Name || ReceivingData.Account_Name === '' ) {
         res.status(400).send({Status: false, Message: "Account Name can not be empty" });
      }else if(!ReceivingData.Account_No || ReceivingData.Account_No === '' ) {
         res.status(400).send({Status: false, Message: "Account No can not be empty" });
      }else if(!ReceivingData.Account_Type || ReceivingData.Account_Type === '' ) {
         res.status(400).send({Status: false, Message: "Account Type can not be empty" });
      }else if(!ReceivingData.Bank_Name || ReceivingData.Bank_Name === '' ) {
         res.status(400).send({Status: false, Message: "Bank Name can not be empty" });
      }else if(!ReceivingData.IFSC_Code || ReceivingData.IFSC_Code === '' ) {
         res.status(400).send({Status: false, Message: "IFSC Code can not be empty" });
      }else if(!ReceivingData.Address || ReceivingData.Address === '' ) {
         res.status(400).send({Status: false, Message: "Address can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_Bank= new SettingsModel.BanksSchema({
            Account_Name: ReceivingData.Account_Name,
            Account_No: ReceivingData.Account_No, 
            Account_Type: ReceivingData.Account_Type,
            Bank_Name: ReceivingData.Bank_Name,
            IFSC_Code: ReceivingData.IFSC_Code,
            Address: ReceivingData.Address,
            Creator_Type: 'Admin',
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Bank.save(function(err, result) { // Bank Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Creation Query Error', 'AccountSettings.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Bank!."});
            } else {
               SettingsModel.BanksSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name'] })
                  .exec(function(err_1, result_1) { // Bank FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Find Query Error', 'AccountSettings.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Bank!."});
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
// Bank List
   exports.Bank_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.BanksSchema
            .find({ Creator_Type: 'Admin', 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name'] })
            .populate({ path: 'Last_Modified_By', select: ['Name'] })
            .exec(function(err, result) { // Bank FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Find Query Error', 'AccountSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Bank!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Bank Simple List
   exports.Bank_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.BanksSchema.find({ Creator_Type: 'Admin','If_Deleted': false }, { Bank : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Bank FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Find Query Error', 'AccountSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Bank!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Bank Update
   exports.Bank_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Bank_Id || ReceivingData.Bank_Id === '' ) {
         res.status(400).send({Status: false, Message: "Bank Details can not be empty" });
      }else if(!ReceivingData.Account_Name || ReceivingData.Account_Name === '' ) {
         res.status(400).send({Status: false, Message: "Account Name can not be empty" });
      }else if(!ReceivingData.Account_No || ReceivingData.Account_No === '' ) {
         res.status(400).send({Status: false, Message: "Account No can not be empty" });
      }else if(!ReceivingData.Account_Type || ReceivingData.Account_Type === '' ) {
         res.status(400).send({Status: false, Message: "Account Type can not be empty" });
      }else if(!ReceivingData.Bank_Name || ReceivingData.Bank_Name === '' ) {
         res.status(400).send({Status: false, Message: "Bank Name can not be empty" });
      }else if(!ReceivingData.IFSC_Code || ReceivingData.IFSC_Code === '' ) {
         res.status(400).send({Status: false, Message: "IFSC Code can not be empty" });
      }else if(!ReceivingData.Address || ReceivingData.Address === '' ) {
         res.status(400).send({Status: false, Message: "Address can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.BanksSchema.findOne({'_id': ReceivingData.Bank_Id}, {}, {}, function(err, result) { // Bank FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank FindOne Query Error', 'AccountSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Bank!."});
            } else {
               if (result !== null) {
                  result.Account_Name = ReceivingData.Account_Name;
                  result.Account_No = ReceivingData.Account_No;
                  result.Account_Type = ReceivingData.Account_Type;
                  result.Bank_Name = ReceivingData.Bank_Name;
                  result.IFSC_Code = ReceivingData.IFSC_Code;
                  result.Address = ReceivingData.Address;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) { // Bank Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Update Query Error', 'AccountSettings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Bank!."});
                     } else {
                        SettingsModel.BanksSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name'] })
                           .exec(function(err_2, result_2) { // Bank FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Find Query Error', 'AccountSettings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The Bank!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Bank Details can not be valid!" });
               }
            }
         });
      }
   };
// Bank Delete
   exports.Bank_Delete = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Bank_Id || ReceivingData.Bank_Id === '' ) {
         res.status(400).send({Status: false, Message: "Bank Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: " User Details can not be empty" });
      }else {
         SettingsModel.BanksSchema.findOne({'_id': ReceivingData.Bank_Id}, {}, {}, function(err, result) { // Bank FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank FindOne Query Error', 'AccountSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Bank!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.User_Id = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) { // Industry Type Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bank Delete Query Error', 'AccountSettings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Bank!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Bank Details can not be valid!" });
               }
            }
         });
      }
   };