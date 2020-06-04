// tslint:disable: variable-name
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _userService: UserService, public router: Router ) {}

  canActivate(): boolean {
    if ( this._userService.isLoggedIn() ){
      console.log('%cACCESS GRANTED', 'color: lightseagreen');
      return true;
    } else {
      console.log('%cACCESS DENIED', 'color: red');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
