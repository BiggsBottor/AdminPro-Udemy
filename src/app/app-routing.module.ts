import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard, VerifyTokenGuard } from './services';


const routes: Routes = [
  // { path: '', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [
      LoginGuard,
      // VerifyTokenGuard
    ],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
