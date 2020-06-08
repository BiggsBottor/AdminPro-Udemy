// tslint:disable: no-inferrable-types
// tslint:disable: no-input-rename
// tslint:disable: no-output-rename
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styles: [
  ]
})
export class IncrementorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() percentage: number = 50;

  @Output('UpdateValue') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChange( newValue: number ) {

    // const elemHTML: any = document.getElementsByName('percentage')[0];

    if (newValue >= 100) {
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }

    // elemHTML.value = this.percentage;
    this.txtProgress.nativeElement.value = this.percentage;

    this.cambioValor.emit(this.percentage);
  }

  cambiarValor( valor: number) {
    // if (typeof(this.percentage) === 'string') { this.percentage = parseInt(this.percentage, 10); }

    if (this.percentage >= 100 && valor > 0) { return; }

    if (this.percentage <= 0 && valor < 0) { return; }

    this.percentage += valor;

    this.cambioValor.emit(this.percentage);

    this.txtProgress.nativeElement.focus();
  }

}
