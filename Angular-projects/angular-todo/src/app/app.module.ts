import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { QuoteComponent } from './quote/quote.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    QuoteComponent,
    CartComponent,
    ShippingComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      RouterModule.forRoot([
        { path: 'products/:productId',
          component: ProductDetailsComponent },
        { path: 'cart',
          component: CartComponent },
        { path: 'shipping',
          component: ShippingComponent },
        { path: 'quote',
          component: QuoteComponent },
        { path: '',
          pathMatch: 'full',
          component: ProductListComponent },
        { path: '**',
          component: ProductListComponent }
      ]),
      NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
