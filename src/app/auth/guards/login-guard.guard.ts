import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {falseIfMissing} from 'protractor/built/util';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(): boolean {

    if (!this.authService.isUserAlreadyLoggedIn()){
      this.router.navigate(['/auth/login']).then();
      return false;
    }
    return true;
  }

  canLoad(): boolean {

    if (!this.authService.isUserAlreadyLoggedIn()){
      this.router.navigate(['/auth/login']).then();
      return false;
    }
    return true;
  }


}
