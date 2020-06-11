import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {ButtonsModule} from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormPostService} from "./services/form-post.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    FormPostService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonsModule
  ],
  bootstrap: [ AppComponent ]

})
export class AppModule {

}
