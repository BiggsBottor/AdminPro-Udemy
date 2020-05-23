import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObservable()
      // .pipe( retry(2) )
      .subscribe(
        num => console.log( 'Subs ', num ),
        error => console.error( 'Error en el obs.', error ),
        () => console.log( 'El observador terminó!!' )
      );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('la página se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable<any>( observer => {

      let counter = 0;

      const interval = setInterval( () => {

        counter++;

        const output = { value: counter };

        // observer.next( counter );
        observer.next( output );

        // if ( counter === 3 ) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

        // if ( counter === 2 ) {
        //   // clearInterval( interval );
        //   observer.error('Auxilio!');
        // }

      }, 1000 );

    }).pipe(
      map( resp => resp.value ),
      filter( ( value, index ) => {
        // console.log('filter ', value, index);
        if ( (value % 2 ) === 1 ) {
          // impar || odd
          return true;
        } else {
          // par || even
          return false;
        }
      })
    );
  }

}
