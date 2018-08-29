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
  selector: 'app-model-product-variant',
  templateUrl: './model-product-variant.component.html',
  styleUrls: ['./model-product-variant.component.css']
})
export class ModelProductVariantComponent implements OnInit {


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
               Product_Variant: new FormControl( '', {  validators: Validators.required,
                                                      asyncValidators: [this.ProductVariant_AsyncValidate.bind(this)],
                                                      updateOn: 'blur' } ),
               Created_By: new FormControl( this.User_Id, Validators.required ),
            });
         }
      // If Edit New Industry Type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Product_Variant: new FormControl(this.Data['Product_Variant'], { validators: Validators.required,
                                                                        asyncValidators: [this.ProductVariant_AsyncValidate.bind(this)],
                                                                        updateOn: 'blur' }),
               Product_Variant_Id: new FormControl(this.Data['_id'], Validators.required),
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

      ProductVariant_AsyncValidate( control: AbstractControl ) {
         const Data = { Product_Variant: control.value, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         return this.Service.ProductVariant_AsyncValidate({'Info': Info}).pipe(map( response => {
            if (this.Data['Product_Variant'] && this.Data['Product_Variant'] === control.value) {
               return null;
            } else {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
                  return null;
               } else {
                  return { ProductVariant_NotAvailable: true};
               }
            }
         }));
      }

   // Submit New Product Variant
      submit() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.ProductVariant_Create({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( {  Type: 'Success', Message: 'New Product Variant Successfully Created'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message']});
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             } else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Creating Product Variant!'});
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update Product Variant
      update() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.ProductVariant_Update({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage({  Type: 'Success', Message: 'Product Variant Successfully Updated'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: ReceivingData['Message'] });
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }  else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Updating Product Variant!'} );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }
            });
         }
      }

}
