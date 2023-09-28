import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

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

  postSecure(route:string, data:any):any {
    const token = sessionStorage.getItem('auth');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `JWT ${token}`);
      return this.http.post<HttpResponse<any>>(`${this.host}${route}`, data, { headers });
    }
  }

  putSecure(route:string, data:any):any {
    const token = sessionStorage.getItem('auth');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `JWT ${token}`);
      return this.http.put<HttpResponse<any>>(`${this.host}${route}`, data, { headers });
    }
  }

  post(route:string, data:any):any {
      return this.http.post<HttpResponse<any>>(`${this.host}${route}`, data);
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

  getGroup():string | boolean {
    const token:string | null= sessionStorage.getItem('auth')
    if(token) {
      const tknDecoded:any = jwtDecode(token)
      return tknDecoded.role[0] 
    }
    else {
      return false;
    }
  }

}
