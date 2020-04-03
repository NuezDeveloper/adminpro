import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  uploadImage: File;

  imgTemp: string;

  constructor(public userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  save(user: User) {
    this.user.name = user.name;

    if (!this.user.google) {
      this.user.email = user.email;
    }


    this.userService.updateUser(this.user)
            .subscribe();
  }

  imageSelected( file: File ) {

    if ( !file ) {
      this.uploadImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('Error al seleccionar imagen', 'Seleccionar sólo imágenes', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.imgTemp = reader.result + '';
  }

  changeImage() {
    this.userService.changeImage( this.uploadImage, this.user._id );
  }



}
