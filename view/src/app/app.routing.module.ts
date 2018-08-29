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

import { ProductSettingsMainComponent } from './Components/settings/productSettings/product-settings-main/product-settings-main.component';


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
   path: 'Product_View',
   component: ViewProductComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Product_View'}  }
},
{
   path: 'Settings_Product',
   component: ProductSettingsMainComponent,
   canActivate: [AuthGuard],
   data: { animation: { value: 'Settings_Product'}  }
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
