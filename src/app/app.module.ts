import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// RUTAS
import { AppRoutingModule } from './app-routing.module';

// MODULOS
import { PagesModule } from './pages/pages.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // FIXME: temp



@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      PagesModule,
      FormsModule, // FIXME: temp
      ReactiveFormsModule // FIXME: temp
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
