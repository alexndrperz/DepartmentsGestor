import { Injectable } from '@angular/core';
import { ApiConnectService } from './api-connect.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private apiServ: ApiConnectService, private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {

    if(next.url[0].path == "encargados" && this.apiServ.isAuth()) {
      return true
    }

    if(this.apiServ.isAuth()){
      const group = this.apiServ.getGroup()
      if (group == "Almacen") {
        return true
      } else {
        
        this.router.navigate(['/notAuthorized'])
        return false

      }
      
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
