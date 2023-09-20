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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlmacenComponent,
    DashboardComponent,
    ProductsComponent,
    FormAddComponent,

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
