import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

   LoginForm: FormGroup;

   Data_1;

   UserRequired: Boolean = false;
   UserMinLengthErr: Boolean = false;


   constructor(
      private router: Router,
      private service: AdminService
   ) { }

   ngOnInit() {
      this.LoginForm = new FormGroup({
         User_Name: new FormControl('', Validators.required),
         User_Password: new FormControl('', Validators.required),
      });
   }
   submit() {
      if (this.LoginForm.valid) {
         const Data = this.LoginForm.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.service.User_Validate({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               this.router.navigate(['List_Hub']);
            } else if (response['status'] === 200 && !ReceivingData.Status) {
               alert(ReceivingData.Message + '-1');
            } else if (response['status'] === 400 && !ReceivingData.Status) {
               alert(ReceivingData.Message + '-2');
            } else if (response['status'] === 417 && !ReceivingData.Status) {
               alert(ReceivingData.Message + '-3');
            } else {
               alert('Some Error Occurred!, Error Not Defined.');
            }
         });
      }
   }
}
