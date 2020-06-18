// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor( public _userService: UserService, public router: Router ) { }

  ngOnInit(): void {
    this.user = this._userService.user;
  }

  search( term: string ) {

    this.router.navigate([ '/search', term ]);

  }

  focusInput( e: any ) { setTimeout(() => e.focus() , 0); }

}
