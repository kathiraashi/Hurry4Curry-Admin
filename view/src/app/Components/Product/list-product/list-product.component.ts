import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToasterServiceService } from '../../../services/Common-Services/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { ProductService } from '../../../services/Product/product.service';
import { AdminService } from '../../../services/Admin/admin.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

   User_Id;

   ActionIndex: number;

   Loader: Boolean = true;

   _List: any[] = [];

   constructor(  private Toaster: ToasterServiceService,
      public Product_Service: ProductService,
      public Service: AdminService,
      public router: Router) {
         this.User_Id = this.Service.GetUserInfo()['_id'];
       }

   ngOnInit() {
      // Get Product List
      const Data = {'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.Product_Service.Product_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(DecryptedData);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Product With Variants List Getting Error!, But not Identify!' });
         }
      });
   }

   SetActionId(_index) {
      this.ActionIndex = _index;
   }

   Edit() {
      this.router.navigate(['/Product_View', this._List[this.ActionIndex]['_id'] ]);
   }

   View() {
      this.router.navigate(['/Product_View', this._List[this.ActionIndex]['_id'] ]);
   }

}
