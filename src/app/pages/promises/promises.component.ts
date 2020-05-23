import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.countThree().then(
        message => console.log('Termino!', message)
      )
      .catch( error => console.error('Error en la promesa ', error));

  }

  ngOnInit(): void {
  }

  countThree(): Promise<boolean> {

    return new Promise<boolean>( (resolve, reject) => {
      let counter = 0;
      const interval = setInterval( () => {
        counter++;
        console.log(counter);
        if (counter === 3) {
          resolve( true );
          // reject('simplemente un error');
          clearInterval(interval);
        }
      }, 1000 );
    });

  }

}
