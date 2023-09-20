import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ProductsComponent } from './subviews/almacen/products/products.component';
import { AlmacenComponent } from './views/almacen/almacen.component';
import { AuthGuardService } from './service/auth-guard.service';
import { FormAddComponent } from './subviews/almacen/form-add/form-add.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },

  {
    path: 'login', 
    component:LoginComponent
  },
  {
    path: 'almacen',
    component:AlmacenComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'productos',component:ProductsComponent},
      {path: 'form-add',component:FormAddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
