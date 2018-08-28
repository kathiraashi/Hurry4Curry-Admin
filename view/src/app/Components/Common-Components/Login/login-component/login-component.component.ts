import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

   constructor(
      private router: Router,
   ) { }

  ngOnInit() {
  }
  submit() {
   this.router.navigate(['List_Hub']);
}
}
