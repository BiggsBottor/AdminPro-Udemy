// tslint:disable: variable-name
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor( public _userService: UserService ) {}

  canActivate(): Promise<boolean> | boolean {

    const token = this._userService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));
    const expired = this.expired( payload.exp );

    if ( expired ) {
      this._userService.logOut();
      return false;
    }

    return this.verifyToRenew( payload.exp );
  }

  verifyToRenew( dateExp: number ): Promise<boolean> {

    return new Promise( ( resolve, reject ) => {

      const tokenExp = new Date( dateExp * 1000 );
      const now = new Date();

      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ) );

      // console.log( tokenExp );
      // console.log( now );

      if ( tokenExp.getTime() > now.getTime() ) {

        resolve(true);

      } else {

        this._userService.renewToken().subscribe( () => {
          resolve(true);
        }, () => {
          this._userService.logOut();
          reject(false);
        });

      }

    });
  }

  expired( dateExp: number) {

    const now = new Date().getTime() / 1000;

    if ( dateExp < now ) { return true; }
    else { return false; }

  }

}
