import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    init_plugins();
  }

  onLogIn() {
    this.router.navigate(['/dashboard']);
    console.log( 'Logging in in process' );
  }

}
