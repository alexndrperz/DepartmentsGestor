import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiConnectService } from 'src/app/service/api-connect.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword:boolean = false;
  loginData:any = {
    name:"",
    password:"",
  }

  constructor(private apiConnect:ApiConnectService, private router: Router) {

  }

  login() {
    this.apiConnect.post('/login',this.loginData )
    .subscribe(
      {
        next: (response: any) => {
          const token: string = response.access;
          const expirationDate = new Date(0);
          const decodeJwt: any= jwtDecode(response.access) 
          let jwtExp= decodeJwt.exp
          let role:string = ""
          expirationDate.setUTCSeconds(jwtExp)
          console.log(decodeJwt);
          
          console.log(expirationDate)
          expirationDate.setDate(expirationDate.getDate());
          sessionStorage.setItem('auth', token);
          if(decodeJwt.role.length >= 0) {
            role = decodeJwt.role[0]
          } else {
            this.router.navigate(['/notFound'])
          }

          if (role == "Almacen") {
            this.router.navigate(['/almacen']);
          } else if(role == "Encargado") {
            this.router.navigate(['/encargados'])
          }
        },
        error: (error: any) => {
          console.log(error.error);
        }
      }
    );


  }
}
