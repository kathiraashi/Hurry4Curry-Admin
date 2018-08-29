import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { ProductsService } from './../../../../services/settings/products.service';
import { ToasterServiceService } from './../../../../services/Common-Services/toaster-service.service';
import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-model-product-unit-of-measure',
  templateUrl: './model-product-unit-of-measure.component.html',
  styleUrls: ['./model-product-unit-of-measure.component.css']
})
export class ModelProductUnitOfMeasureComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   Data;

   Uploading: Boolean = false;
   Form: FormGroup;
   User_Id;

   constructor( public bsModalRef: BsModalRef,
                public Service: ProductsService,
                private Toastr: ToasterServiceService,
                private Admin_Service: AdminService
            ) {
               this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
            }

   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Industry Type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Product_UnitOfMeasure: new FormControl( '', {  validators: Validators.required,
                                                      asyncValidators: [this.ProductUnitOfMeasure_AsyncValidate.bind(this)],
                                                      updateOn: 'blur' } ),
               Created_By: new FormControl( this.User_Id, Validators.required ),
            });
         }
      // If Edit New Industry Type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Product_UnitOfMeasure: new FormControl(this.Data['Product_UnitOfMeasure'], { validators: Validators.required,
                                                                        asyncValidators: [this.ProductUnitOfMeasure_AsyncValidate.bind(this)],
                                                                        updateOn: 'blur' }),
               Product_UnitOfMeasure_Id: new FormControl(this.Data['_id'], Validators.required),
               User_Id: new FormControl(this.User_Id, Validators.required)
            });
         }
   }
   // onSubmit Function
      onSubmit() {
         if (this.Type === 'Create') {
            this.submit();
         }
         if (this.Type === 'Edit') {
            this.update();
         }
      }

      ProductUnitOfMeasure_AsyncValidate( control: AbstractControl ) {
         const Data = { Product_UnitOfMeasure: control.value, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         return this.Service.ProductUnitOfMeasure_AsyncValidate({'Info': Info}).pipe(map( response => {
            if (this.Data['Product_UnitOfMeasure'] && this.Data['Product_UnitOfMeasure'] === control.value) {
               return null;
            } else {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
                  return null;
               } else {
                  return { ProductUnitOfMeasure_NotAvailable: true};
               }
            }
         }));
      }

   // Submit New Product UnitOfMeasure
      submit() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.ProductUnitOfMeasure_Create({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( {  Type: 'Success', Message: 'New Unit Of Measure Successfully Created'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message']});
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
               } else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Creating  Unit Of Measure!'});
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update Product UnitOfMeasure
      update() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.ProductUnitOfMeasure_Update({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage({  Type: 'Success', Message: 'Unit Of Measure Successfully Updated'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: ReceivingData['Message'] });
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }  else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Updating Unit Of Measure!'} );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }
            });
         }
      }

}
