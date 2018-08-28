import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponentComponent } from './Components/Common-Components/Login/login-component/login-component.component';
import { ListHubComponent } from './Components/Hub/list-hub/list-hub.component';
import { CreateHubComponent } from './Components/Hub/create-hub/create-hub.component';
import { ViewHubComponent } from './Components/Hub/view-hub/view-hub.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';


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
   data: { animation: { value: 'List_Hub'}  }
},
{
   path: 'Create_Hub',
   component: CreateHubComponent,
   data: { animation: { value: 'Create_Hub'}  }
},
{
   path: 'View_Hub',
   component: ViewHubComponent,
   data: { animation: { value: 'View_Hub'}  }
},
{
   path: 'Product_List',
   component: ListProductComponent,
   data: { animation: { value: 'Product_List'}  }
},
{
   path: 'Product_Create',
   component: CreateProductComponent,
   data: { animation: { value: 'Product_Create'}  }
},
{
   path: 'Product_View',
   component: ViewProductComponent,
   data: { animation: { value: 'Product_View'}  }
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
