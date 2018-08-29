import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelProductUnitOfMeasureComponent } from '../../../../../models/settings/product/model-product-unit-of-measure/model-product-unit-of-measure.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { ProductsService } from './../../../../../services/settings/products.service';
import { ToasterServiceService } from './../../../../../services/Common-Services/toaster-service.service';
import { AdminService } from './../../../../../services/Admin/admin.service';

@Component({
  selector: 'app-product-unit-of-measure',
  templateUrl: './product-unit-of-measure.component.html',
  styleUrls: ['./product-unit-of-measure.component.css']
})
export class ProductUnitOfMeasureComponent implements OnInit {



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
                  // Get Product Unit Of Measure List
                     const Data = { 'User_Id' : this.User_Id };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Loader = true;
                     this.Service.ProductUnitOfMeasure_List({'Info': Info}).subscribe( response => {
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
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Unit of Measures List Getting Error!, But not Identify!' });
                        }
                     });
                  }

   ngOnInit() { }


   // Create New Product Unit Of Measure
      Create_ProductUnitOfMeasure() {
         const initialState = { Type: 'Create', Data: {} };
         this.bsModalRef = this.modalService.show(ModelProductUnitOfMeasureComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
              this._List.splice(0, 0, response['Response']);
            }
         });
      }
   // Edit Product Unit Of Measure
      Edit_ProductUnitOfMeasure(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelProductUnitOfMeasureComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
               this._List[_index] = response['Response'];
            }
         });
      }
   // View Product Unit Of Measure
      View_ProductUnitOfMeasure(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelProductUnitOfMeasureComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Product Unit Of Measure
      Delete_ProductUnitOfMeasure(_index) {
         const initialState = {
            Text: 'Product Unit Of Measure '
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Product_UnitOfMeasure_Id':  this._List[_index]._id, 'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.ProductUnitOfMeasure_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage( { Type: 'Warning', Message: 'Unit Of Measure Successfully Deleted'} );
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
