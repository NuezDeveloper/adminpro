import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadImage: File;

  imgTemp: string;

  constructor(
    public uploadFileService: UploadFileService,
    public moadlUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
  }

  upImage() {
    this.uploadFileService.uploadFile( this.uploadImage, this.moadlUploadService.type, this.moadlUploadService.id )
                          .then( resp => {
                            this.moadlUploadService.notification.emit(resp);
                            this.closeModal();
                          } )
                          .catch( err => console.log('Error al cargar el archivo') );
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

  closeModal() {
    this.imgTemp = null;
    this.uploadImage = null;

    this.moadlUploadService.hideModal();
  }
}
