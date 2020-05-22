import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  removeAll() {
    this.items = this.cartService.clearCart();
  }

  remove(item: any) {
    this.items = this.cartService.removeItem(item);
  }

  buyAll() {
    window.alert('Items have been bought');
  }
}
