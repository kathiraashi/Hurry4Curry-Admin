import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ToasterServiceService } from '../../../services/Common-Services/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { HubService } from '../../../services/Hub/hub.service';

@Component({
  selector: 'app-list-hub',
  templateUrl: './list-hub.component.html',
  styleUrls: ['./list-hub.component.css']
})
export class ListHubComponent implements OnInit {

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b3c7268f838b31bc89e7c8c';

   Loader: Boolean = true;

   _List: any[] = [];

   bsModalRef: BsModalRef;
   constructor(  private Toaster: ToasterServiceService,
      public Hub_Service: HubService,
      public router: Router,
      private modalService: BsModalService) { }

  ngOnInit() {
     // Get Hub List
     const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Loader = true;
     this.Hub_Service.Hub_List({'Info': Info}).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        this.Loader = false;
        if (response['status'] === 200 && ResponseData['Status'] ) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this._List = DecryptedData;
           console.log(this._List);
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Hub List Getting Error!, But not Identify!' });
        }
     });

  }

}