// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services';
import { User } from '../models/User.model';
import swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  emailPattern = '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,4}'; // a@a.aa

  constructor(public _userService: UserService, public router: Router) { }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      name: new FormControl( null, Validators.required ),
      // email: new FormControl( null, [Validators.required, Validators.pattern(this.emailPattern)]),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl(null, Validators.required ),
      terms: new FormControl( false )
    },
    { validators: this.passwordMatchValidator('password', 'password2') }
    );

    // for testing default values
    this.forma.setValue({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      terms: true
    });
  }

  // custom validators
  passwordMatchValidator(field1: string, field2: string) {
    return ( g: FormGroup ) => {
      if (g.controls[field1].value === g.controls[field2].value) { return null; }
      return { mismatch: true };
    };
  }

  // convenience getter for easy access to form fields
  get fv() { return this.forma.value; }

  registerUser() {

    if ( this.forma.invalid ) { return; }
    if ( !this.forma.value.terms ) {
      swal.fire({ title: 'Importante', text: 'Debe aceptar las condiciones', icon: 'warning'});
      return;
    }
    const user = new User(
      this.fv.name,
      this.fv.email,
      this.fv.password
    );

    this._userService.createUser( user )
                    .subscribe( resp => this.router.navigate(['/login']));

  }

}
