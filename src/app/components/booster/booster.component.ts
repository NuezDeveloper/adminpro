import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styles: []
})
export class BoosterComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 5;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('Leyenda', this.leyenda);
  }

  onChange( newValue: number ) {

    // let elemHTML: any = document.getElementsByName('porcentaje')[0];

    if ( newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    // elemHTML.value = this.porcentaje;

    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioValor.emit( this.porcentaje );

    this.txtProgress.nativeElement.focus();
  }

  cambiarValor( valor ) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    } else if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje += valor;

    this.cambioValor.emit( this.porcentaje );
  }

}
