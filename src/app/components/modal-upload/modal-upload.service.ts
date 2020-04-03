import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public hidden: string = 'hidden';

  public notification = new EventEmitter<any>();

  constructor() {
    console.log('modal service ready');
  }

  hideModal() {
    this.hidden = 'hidden';
    this.id = null;
    this.type = null;
  }

  showModal( type: string, id: string ) {
    this.hidden = '';
    this.id = id;
    this.type = type;
  }
}
