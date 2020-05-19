import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { QuoteComponent } from './quote/quote.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavbarComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    QuoteComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
          { path: 'products/:productId',
            component: ProductDetailsComponent },
          { path: 'quote',
            component: QuoteComponent },
          { path: '',
            pathMatch: 'full',
            component: ProductListComponent },
          { path: '**',
            component: ProductListComponent }
      ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
