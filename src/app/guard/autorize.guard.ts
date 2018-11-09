import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuard implements CanActivate {
  constructor (private _auth: AuthorizationService, private _router: Router) {}

  canActivate(): boolean{
    if(this._auth.loggedIn()){
      return true;
    } else{
      this._router.navigate(['/'])
      return false
    }
  }
}
