import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpXhrBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string ) {

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {

        if ( xhr.readyState === 4) {
          if ( xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('fallo en la subida');
            reject(xhr.response);
          }
        }

      };

      let url = URL_SERVICES + '/upload/' + type + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });

  }
}
