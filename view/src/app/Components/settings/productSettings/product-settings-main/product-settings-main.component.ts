import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-settings-main',
  templateUrl: './product-settings-main.component.html',
  styleUrls: ['./product-settings-main.component.css']
})
export class ProductSettingsMainComponent implements OnInit {

   Active_Tab = 'Variants';

   constructor() { }

   ngOnInit() {
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }

}
