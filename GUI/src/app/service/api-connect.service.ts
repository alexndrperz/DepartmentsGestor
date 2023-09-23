import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
    return this.http.get<HttpResponse<any>>(`${this.host}${route}`);
  }

  getSecure(route:string): any {
    const token = sessionStorage.getItem('auth');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `JWT ${token}`);
      return this.http.get(`${this.host}${route}`, { headers });
    }
  }

  getImg(route:string):any {
    return this.http.get(`${this.host}${route}`,{responseType: 'blob'});
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
