import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectService {

  constructor(private http:HttpClient, private cookie:CookieService) { }
  private host:string = "http://127.0.0.1:8000"

  get(route:string): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.host}${route}`, {withCredentials:true});
  }

  post(route:string, data:any):Observable<any> {
    return  this.http.post<HttpResponse<any>>(`${this.host}${route}`, data, {withCredentials:true})
  }

  isAuth():boolean {
    const token:string | null= sessionStorage.getItem('auth')
    if(token) {
      return true;
    }
    else {
      return false;
    }
  }

}
