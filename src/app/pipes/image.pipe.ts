import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): unknown {


    let url = URL_SERVICES + '/images';

    if (!img) {
      return url + '/users/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'user':
        url += '/users/' + img;
        break;
      case 'doctor':
        url += '/doctors/' + img;
        break;
      case 'hospital':
        url += '/hospital/' + img;
        break;
      default:
        console.error('Tipo de imagen no existe');
        url += '/users/xxx';
    }
    return url;
  }

}
