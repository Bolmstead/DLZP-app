import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cart.update((prev) => [...prev, product]);
  }

  removeFromCart(product: Product) {
    this.cart.update((prev) => prev.filter((p) => p.id !== product.id));
  }

  constructor() {}
}
