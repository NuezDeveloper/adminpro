import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import { URL_SERVICES } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;

  totalUsers: number = 0;

  loading: boolean = true;

  constructor(public userService: UserService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.modalUploadService.notification.subscribe( resp => this.loadUsers() );
  }

  showModal( id: string ) {
    this.modalUploadService.showModal('users', id);
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from)
                .subscribe( (resp: any) => {
                  // console.log(resp);
                  this.totalUsers = resp.total;
                  this.users = resp.users;
                  this.loading = false;
                });
  }
  changeFrom( value: number ) {
    const from = this.from + value;
    // console.log(from);

    if ( from >= this.totalUsers ) {
      return;
    }

    if ( from < 0 ) {
      return;
    }
    this.from += value;
    this.loadUsers();
  }

  searchUser( term: string ) {

    if ( term.length <= 0 ) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this.userService.searchUser(term)
                  .subscribe( (users: User[]) => {
                    this.users = users;
                    this.loading = false;
                  });
  }

  deteleUser( user: User ) {
    if (user._id === this.userService.user._id) {
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Está Seguro?',
      text: 'Está a punto de borrar a ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.userService.deleteUser(user._id)
                        .subscribe( resp => {
                          swal('El usuario ' + user.name + ' ha sido eliminado!', {
                            icon: 'success',
                          });
                          this.from = 0;
                          this.loadUsers();
                        });
      }
    });
  }

  saveUser( user: User ) {
    console.log(user);
    this.userService.updateUser(user)
                    .subscribe(resp => console.log('se hizo'));
  }

}
