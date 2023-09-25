import { Injectable } from '@angular/core';
import { ApiConnectService } from './api-connect.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private apiServ: ApiConnectService, private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if(this.apiServ.isAuth()){
      return true
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
