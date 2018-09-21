import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './Authentication/auth.guard';

import { LoginComponentComponent } from './Components/Common-Components/Login/login-component/login-component.component';
import { ListHubComponent } from './Components/Hub/list-hub/list-hub.component';
import { CreateHubComponent } from './Components/Hub/create-hub/create-hub.component';
import { ViewHubComponent } from './Components/Hub/view-hub/view-hub.component';
import { EditHubComponent } from './Components/Hub/edit-hub/edit-hub.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';
import { ListSupplierComponent } from './Components/Supplier/list-supplier/list-supplier.component';
import { CreateSupplierComponent } from './Components/Supplier/create-supplier/create-supplier.component';
import { ViewSupplierComponent } from './Components/Supplier/view-supplier/view-supplier.component';

import { ProductSettingsMainComponent } from './Components/settings/productSettings/product-settings-main/product-settings-main.component';
import { EditSupplierComponent } from './Components/Supplier/edit-supplier/edit-supplier.component';

import { AccountSettingsMainComponent } from './Components/settings/AccountSettings/account-settings-main/account-settings-main.component';


const appRoutes: Routes = [{
   path: '',
   component: LoginComponentComponent,
   data: { animation: { value: 'Login'}  }
},
{
   path: 'Login',
   component: LoginComponentComponent,
   data: { animation: { value: 'Login'}  }
},
{
   path: 'List_Hub',
   component: ListHubComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'List_Hub'}  }
},
{
   path: 'Create_Hub',
   component: CreateHubComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Create_Hub'}  }
},
{
   path: 'View_Hub/:Hub_Id',
   component: ViewHubComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'View_Hub'}  }
},
{
   path: 'Edit_Hub/:Hub_Id',
   component: EditHubComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Edit_Hub'}  }
},
{
   path: 'Product_List',
   component: ListProductComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Product_List'}  }
},
{
   path: 'Product_Create',
   component: CreateProductComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Product_Create'}  }
},
{
   path: 'Product_View/:Product_Id',
   component: ViewProductComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Product_View'}  }
},
{
  path: 'Supplier_List',
  component: ListSupplierComponent,
  canActivate: [AuthGuard],
  data: { animation: { value: 'Supplier_List'} }
},
{
  path: 'Supplier_Create',
  component: CreateSupplierComponent,
  canActivate: [AuthGuard],
  data: { animation: { value: 'Supplier_Create'} }
},
{
  path: 'Supplier_View/:Supplier_Id',
  component: ViewSupplierComponent,
  canActivate: [AuthGuard],
  data: { animation: { value: 'Supplier_View'} }
},
{
  path: 'Supplier_Edit/:Supplier_Id',
  component: EditSupplierComponent,
  canActivate: [AuthGuard],
  data: { animation: { value: 'Supplier_Edit'}  }
},
{
   path: 'Settings_Product',
   component: ProductSettingsMainComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Settings_Product'}  }
},
{
   path: 'Settings_Account',
   component: AccountSettingsMainComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Settings_Account'}  }
}

];

@NgModule({
   declarations: [ ],
   imports: [ RouterModule.forRoot(appRoutes,
       { enableTracing: true }
     )],
   providers: [],
   bootstrap: []
 })
 export class AppRoutingModule {}
