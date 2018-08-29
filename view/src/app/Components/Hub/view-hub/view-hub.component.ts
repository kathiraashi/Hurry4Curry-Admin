import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToasterServiceService } from '../../../services/Common-Services/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { HubService } from '../../../services/Hub/hub.service';
import { AdminService } from '../../../services/Admin/admin.service';


@Component({
  selector: 'app-view-hub',
  templateUrl: './view-hub.component.html',
  styleUrls: ['./view-hub.component.css']
})
export class ViewHubComponent implements OnInit {

   User_Id;
   Hub_Id;

   Loader: Boolean = true;

   _Data: object = {};

  constructor(private Toaster: ToasterServiceService,
   public Hub_Service: HubService,
   private active_route: ActivatedRoute,
   public Service: AdminService) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
   }

   ngOnInit() {
      this.active_route.url.subscribe((u) => {
         this.Hub_Id = this.active_route.snapshot.params['Hub_Id'];
         const Data = {'User_Id' : this.User_Id, Hub_Id: this.Hub_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Loader = true;
         this.Hub_Service.Hub_View({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Loader = false;
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
               console.log(DecryptedData);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Hub Data Getting Error!, But not Identify!' });
            }
         });
      });
   }


}
