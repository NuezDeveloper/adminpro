import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;

  auth2: any;

  constructor( public router: Router,
               public userService: UserService ) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email');
    console.log(localStorage.getItem('email'));

    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        cliend_id: '874664240815-66qmd1i26mf21hiap88k9idtmkcr2so9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });

  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.userService.loginGoogle(token)
                  .subscribe( correct => window.location.href = '#/dashboard');
      // console.log(token);
    });
  }

  ingresar( form: NgForm ) {

    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.rememberme)
                .subscribe( correct => this.router.navigate(['/dashboard']));

    // this.router.navigate(['/dashboard']);

  }

}
