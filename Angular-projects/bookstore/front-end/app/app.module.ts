import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { NavbarComponent } from './others/navbar/navbar.component';
import { FooterComponent } from './others/footer/footer.component';
import { AboutComponent } from './others/about/about.component';
import { RegisterComponent } from './user_space/register/register.component';
import { LoginComponent } from './user_space/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './others/page-not-found/page-not-found.component';
import { AccountComponent } from './user_space/account/account.component';
import { BookaddComponent } from './bookadd/bookadd.component';
import { BookCardComponent } from './others/book-card/book-card.component';
import { UserbooksComponent } from './userbooks/userbooks.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    AccountComponent,
    BookaddComponent,
    BookCardComponent,
    UserbooksComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
