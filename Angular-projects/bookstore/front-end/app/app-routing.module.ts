import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './others/page-not-found/page-not-found.component';
import {RegisterComponent} from './user_space/register/register.component';
import {LoginComponent} from './user_space/login/login.component';
import {AboutComponent} from './others/about/about.component';
import {AccountComponent} from './user_space/account/account.component';
import {BookaddComponent} from './bookadd/bookadd.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'book_add',
    component: BookaddComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
