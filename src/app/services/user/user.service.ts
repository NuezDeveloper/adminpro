import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';


import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient,
              public router: Router,
              public uploadFile: UploadFileService) {
    this.loadStorage();
  }

  isLoggedIn(): boolean {
    return (this.token !== '');
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.token = null;
    }
  }

  saveStorage( id: string, token: string, user: User ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';

    return this.http.post( url, { token })
            .pipe( map( (resp: any) => {
              this.saveStorage(resp.id, resp.token, resp.user);

              return true;
            }) );

  }

  login( user: User, remember: boolean = false ) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http.post( url, user )
            .pipe( map( (resp: any ) => {
              this.saveStorage(resp.id, resp.token, resp.user);

              return true;
            }));

  }

  createUser( user: User ) {

    const url = URL_SERVICES + '/user';

    return this.http.post(url, user)
            .pipe( map( (resp: any ) => {
              swal('Usuario creado', user.email, 'success');
              return resp.user;
            }));

  }

  updateUser(user: User) {
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user)
                .pipe(map( (resp: any) => {
                  // this.user = resp.user;
                  const userDB = resp.user;
                  this.saveStorage(userDB._id, this.token, userDB);
                  swal('Usuario Actualizado', user.name, 'success');

                  return true;
                }));
  }

  changeImage( file: File, id: string) {
    this.uploadFile.uploadFile(file, 'users', id)
                  .then( (resp: any) => {
                    this.user.img = resp.user.img;
                    swal('Imagen de usuario actualizada', this.user.name, 'success');
                    this.saveStorage(id, this.token, this.user);
                  })
                  .catch( resp => console.error(resp));
  }
}
