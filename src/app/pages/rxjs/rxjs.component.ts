import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObserver()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('ups!', error),
      () => console.log('finalizado')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('The page is closing');
    this.subscription.unsubscribe();
  }

  regresaObserver(): Observable <any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {
        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('auxilio');
        // }

      }, 1000 );

    } ).pipe(
      map( res => res.valor),
      filter( ( valor, index ) => {
        // console.log('Filter', valor, index);
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      } )
    );
  }
}
