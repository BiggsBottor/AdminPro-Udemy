import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NoPageFoundComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NoPageFoundComponent
  ]
})
export class SharedModule { }
