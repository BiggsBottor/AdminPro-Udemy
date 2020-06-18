// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor( public _sidebar: SidebarService, public _userService: UserService ) {}

  ngOnInit(): void {
    this.user = this._userService.user;
    this._sidebar.loadMenu();
  }

}
