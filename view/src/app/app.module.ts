import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Default Components
import { AppComponent } from './app.component';

// Future Modules
   import { ModalModule, AccordionModule} from 'ngx-bootstrap';
   import {CalendarModule} from 'primeng/calendar';
   import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule} from '@angular/material';
   import {MatRadioModule} from '@angular/material/radio';
   import { NgSelectModule } from '@ng-select/ng-select';

// Custom Modules
   import { AppRoutingModule } from './app.routing.module';

import { HeaderComponentComponent } from './Components/Common-Components/header/header-component/header-component.component';
import { ListHubComponent } from './Components/Hub/list-hub/list-hub.component';
import { CreateHubComponent } from './Components/Hub/create-hub/create-hub.component';
import { ViewHubComponent } from './Components/Hub/view-hub/view-hub.component';
import { LoginComponentComponent } from './Components/Common-Components/Login/login-component/login-component.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    ListHubComponent,
    CreateHubComponent,
    ViewHubComponent,
    LoginComponentComponent,
    CreateProductComponent,
    ListProductComponent,
    ViewProductComponent,
  ],
  imports: [
    // Default Modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     // future modules
     ModalModule.forRoot(),
     AccordionModule.forRoot(),
     CalendarModule,
     NgSelectModule,
     MatButtonModule,
     MatFormFieldModule,
     MatSelectModule,
     MatCheckboxModule,
     MatMenuModule,
     MatRadioModule,
     // Custom Modules
     AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
