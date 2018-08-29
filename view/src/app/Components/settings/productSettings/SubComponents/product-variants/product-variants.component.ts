import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelProductVariantComponent } from '../../../../../models/settings/product/model-product-variant/model-product-variant.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { ProductsService } from './../../../../../services/settings/products.service';
import { ToasterServiceService } from './../../../../../services/Common-Services/toaster-service.service';
import { AdminService } from './../../../../../services/Admin/admin.service';


@Component({
  selector: 'app-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.css']
})
export class ProductVariantsComponent implements OnInit {


   bsModalRef: BsModalRef;
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Loader: Boolean = true;
   _List: any[] = [];

   User_Id;

   constructor(   private modalService: BsModalService,
                  private Service: ProductsService,
                  private Toastr: ToasterServiceService,
                  private Admin_Service: AdminService
               ) {
                  this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
                  // Get Product Variant List
                     const Data = { 'User_Id' : this.User_Id };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Loader = true;
                     this.Service.ProductVariant_List({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        this.Loader = false;
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                        } else if (response['status'] === 401 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                        } else {
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Product Variant List Getting Error!, But not Identify!' });
                        }
                     });
                  }

   ngOnInit() { }


   // Create New Product Variant
      Create_ProductVariant() {
         const initialState = { Type: 'Create', Data: {} };
         this.bsModalRef = this.modalService.show(ModelProductVariantComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
              this._List.splice(0, 0, response['Response']);
            }
         });
      }
   // Edit Product Variant
      Edit_ProductVariant(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelProductVariantComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
               this._List[_index] = response['Response'];
            }
         });
      }
   // View Product Variant
      View_ProductVariant(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelProductVariantComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Product Variant
      Delete_ProductVariant(_index) {
         const initialState = {
            Text: 'Product Variant'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Product_Variant_Id':  this._List[_index]._id, 'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.ProductVariant_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage( { Type: 'Warning', Message: 'Product Variant Successfully Deleted'} );
                  } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: ResponseData['Message'] } );
                  } else if (returnResponse['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: ResponseData['Message'] } );
                  } else {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' } );
                  }
               });
            }
         });
      }

}
