var CryptoJS = require("crypto-js");
var AdminModel = require('./../../Models/Admin/AdminManagement.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// -------------------------------------------------- User Create -----------------------------------------------
   exports.User_Create = function(req, res) {

      if(!req.body.User_Name || req.body.User_Name  === '' ) {
         res.status(400).send({Status: false, Message: "User Name can not be empty" });
      }else if(!req.body.User_Password || req.body.User_Password  === '' ) {
         res.status(400).send({Status: false, Message: "User Password can not be empty" });
      }else if(!req.body.Name || req.body.Name  === '' ) {
         res.status(400).send({Status: false, Message: "Name can not be empty" });
      }else if(!req.body.Email || req.body.Email  === '' ) {
         res.status(400).send({Status: false, Message: "Email can not be empty" });
      }else {

         var User_Management = new AdminModel.User_Management({
            User_Name: req.body.User_Name,
            User_Password: req.body.User_Password,
            Name: req.body.Name,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Active_Status: true,
         });
         User_Management.save( function(error, result) {
            if (error) {
               if (error.code === 11000) {
                  res.status(400).send({ Status: false, Message: "User Name Already Exist!." });
               }else {
                  res.status(400).send({ Status: false, Message: "Some error occurred while creating the User!." });
               }
            }else {
               res.status(200).send({ Status: true, Response: result });
            }
         });
         
      }
      
   };
// -------------------------------------------------- User Validate -----------------------------------------------
   exports.User_Validate = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
         res.status(400).send({Status: false, Message: "User Name can not be empty" });
      }else if(!ReceivingData.User_Password || ReceivingData.User_Password === '' ) {
         res.status(400).send({Status: false, Message: "User Password can not be empty" });
      }else {
         AdminModel.User_Management.findOne( {  User_Name: { $regex : new RegExp("^" + ReceivingData.User_Name + "$", "i") },
                                                User_Password: ReceivingData.User_Password, 
                                                Active_Status: true 
                                             }, {User_Password: 0}, function(err, result) {
            if(err) {
               res.status(417).send({status: false, Message: "Some error occurred while Find Users Name!."});
            } else {
               if ( result !== null) {
                  var ReturnData  = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               } else {
                  res.status(200).send({Status: false, Message: 'User Details Not Valid!' });
               }
            }
         });
      }
   };




// -------------------------------------------------- Countries List----------------------------------------------------------
   exports.Country_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

       if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      } else {
         AdminModel.Global_Country.find({}, {Country_Name: 1}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Countries Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find the Countries List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
  
// -------------------------------------------------- States List ----------------------------------------------------------
   exports.State_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      }else if(!ReceivingData.Country_Id || ReceivingData.Country_Id === '') {
         res.status(200).send({Status:"True", Output:"False", Message: "Country Id can not be empty" });
      }else{
         AdminModel.Global_State.find({ Country_DatabaseId: ReceivingData.Country_Id }, { State_Name: 1}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'States List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find the States List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
  
// -------------------------------------------------- Cities List ----------------------------------------------------------
   exports.City_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      }else if(!ReceivingData.State_Id || ReceivingData.State_Id === '') {
               res.status(200).send({Status:"True", Output:"False", Message: "State Id can not be empty" });
         }else{
            AdminModel.Global_City.find({ State_DatabaseId: ReceivingData.State_Id }, { City_Name: 1}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Cities List Find Query Error', 'AdminManagement.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find the Cities List!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
   };