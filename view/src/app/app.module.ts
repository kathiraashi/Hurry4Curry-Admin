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

import { AuthGuard } from './Authentication/auth.guard';


// Future Modules
   import { ModalModule, AccordionModule} from 'ngx-bootstrap';
   import { CalendarModule } from 'primeng/calendar';
   import { ChipsModule } from 'primeng/chips';
   import { MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatRadioModule} from '@angular/material';
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
import { EditHubComponent } from './Components/Hub/edit-hub/edit-hub.component';
import { ProductSettingsMainComponent } from './Components/settings/productSettings/product-settings-main/product-settings-main.component';
import { ProductVariantsComponent } from './Components/settings/productSettings/SubComponents/product-variants/product-variants.component';
import { ProductUnitOfMeasureComponent } from './Components/settings/productSettings/SubComponents/product-unit-of-measure/product-unit-of-measure.component';
import { ModelProductVariantComponent } from './models/settings/product/model-product-variant/model-product-variant.component';
import { ModelProductUnitOfMeasureComponent } from './models/settings/product/model-product-unit-of-measure/model-product-unit-of-measure.component';
import { DeleteConfirmationComponent } from './Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { CreateSupplierComponent } from './Components/Supplier/create-supplier/create-supplier.component';
import { ViewSupplierComponent } from './Components/Supplier/view-supplier/view-supplier.component';
import { ListSupplierComponent } from './Components/Supplier/list-supplier/list-supplier.component';
import { EditSupplierComponent } from './Components/Supplier/edit-supplier/edit-supplier.component';

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
    EditHubComponent,
    ProductSettingsMainComponent,
    ProductVariantsComponent,
    ProductUnitOfMeasureComponent,
    ModelProductVariantComponent,
    ModelProductUnitOfMeasureComponent,
    DeleteConfirmationComponent,
    ListSupplierComponent,
    CreateSupplierComponent,
    ViewSupplierComponent,
    EditSupplierComponent,
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
     ChipsModule,
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
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
                     DeleteConfirmationComponent,
                     ModelProductVariantComponent,
                     ModelProductUnitOfMeasureComponent
                  ]
})
export class AppModule { }
