import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
