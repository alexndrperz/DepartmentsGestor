import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiConnectService } from 'src/app/service/api-connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword:boolean = false;
  loginData:any = {
    username:"",
    password:"",
  }

  constructor(private apiConnect:ApiConnectService, private router: Router) {

  }

  login() {
    this.apiConnect.post('/login',this.loginData )
    .subscribe(
      (response: any) => {
        const token:string = response.token
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        sessionStorage.setItem('auth', token);
        this.router.navigate(['/almacen'])
      },
      (error:any) => {
        console.log(error.error)
      }
    )
  }
}
