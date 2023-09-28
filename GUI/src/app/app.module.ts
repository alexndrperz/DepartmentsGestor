import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { AlmacenComponent } from './views/almacen/almacen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './subviews/almacen/products/products.component';
import { FormAddComponent } from './subviews/almacen/form-add/form-add.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SolicitantesComponent } from './views/solicitantes/solicitantes.component';
import { FormSolicdComponent } from './components/form-solicd/form-solicd.component';
import { SolicitudesTableComponent } from './components/solicitudes-table/solicitudes-table.component';
import { EncargadosComponent } from './views/encargados/encargados.component';
import { ProductsEncComponent } from './subviews/encargados/products-enc/products-enc.component';
import { SolicitudesEncComponent } from './subviews/encargados/solicitudes-enc/solicitudes-enc.component';
import { ForbbidenComponent } from './views/forbbiden/forbbiden.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlmacenComponent,
    DashboardComponent,
    ProductsComponent,
    FormAddComponent,
    ModalComponent,
    NotFoundComponent,
    SolicitantesComponent,
    FormSolicdComponent,
    SolicitudesTableComponent,
    EncargadosComponent,
    ProductsEncComponent,
    SolicitudesEncComponent,
    ForbbidenComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
