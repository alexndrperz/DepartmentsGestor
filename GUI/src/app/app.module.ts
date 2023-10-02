import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FiltersComponent } from './components/filters/filters.component';





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
    PaginatorComponent,
    FiltersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
