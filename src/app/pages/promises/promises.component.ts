import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    let promesa = new Promise( (resolve, reject) => {

      let contador = 0;

      setInterval( () => {
        contador += 1;

        if ( contador === 3) {
          resolve();
        }

      }, 1000 );

    } );


    promesa.then(
      () => console.log('good')
    ).catch(
      error => console.error('bad', error)
    );

  }

  ngOnInit(): void {
  }

}
