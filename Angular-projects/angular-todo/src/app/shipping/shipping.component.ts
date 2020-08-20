import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippingCosts;
  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

  onSubmit(checkoutForm){
    this.cartService.clearCart();
    this.checkoutForm.reset();
    window.alert('order has been submitted');
  }

}
