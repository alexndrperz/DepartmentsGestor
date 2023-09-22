import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ProductsComponent } from './subviews/almacen/products/products.component';
import { AlmacenComponent } from './views/almacen/almacen.component';
import { AuthGuardService } from './service/auth-guard.service';
import { FormAddComponent } from './subviews/almacen/form-add/form-add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SolicitantesComponent } from './views/solicitantes/solicitantes.component';
import { SolicitudesTableComponent } from './components/solicitudes-table/solicitudes-table.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'solicitudes/:dept_token', 
    component: SolicitantesComponent
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
      {path:'',redirectTo: 'productos',pathMatch:'full'},
      {path: 'productos',component:ProductsComponent},
      {path: 'form-add',component:FormAddComponent},
      {path: 'solicitudes',component:SolicitudesTableComponent}
    ]
  },
  {
    path:'**',
    redirectTo:'notFound',
    pathMatch:'full'
  },
  {
    path:'notFound',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
