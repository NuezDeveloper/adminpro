import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import sweetAlert from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
        public _userService: UserService,
        public _router: Router
        ) { }

  areEquals(field1: string, field2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
          areEquals: true
      };

    };

  }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      pass: new FormControl( null, Validators.required ),
      pass2: new FormControl( null, Validators.required ),
      conditions: new FormControl( false )

    }, { validators: this.areEquals('pass', 'pass2') });

    this.form.setValue({
      name: 'test',
      email: 'test@test.com',
      pass: '123456',
      pass2: '123456',
      conditions: true
    });

  }

  signupUser() {

    if ( this.form.invalid ) {
      return;
    }

    if ( !this.form.value.conditions ) {
      sweetAlert('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.pass,
    );

    this._userService.createUser( user )
                .subscribe( res =>  this._router.navigate(['./login']));

  }

}
