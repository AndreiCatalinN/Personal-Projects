import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { HerodetailComponent } from './herodetail/herodetail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AppComponent } from './app.component';

import { InMemoryDataService } from './Services/in-memory-data.service';
import {MessageService} from './Services/message.service';
import {HeroService} from './Services/hero.service';
import { Page404Component } from './page404/page404.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { AddHeroComponent } from './add-hero/add-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HerodetailComponent,
    MessagesComponent,
    DashboardComponent,
    Page404Component,
    HeroSearchComponent,
    AddHeroComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    )
  ],
  providers: [
    HeroService,
    MessageService,
    InMemoryDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
