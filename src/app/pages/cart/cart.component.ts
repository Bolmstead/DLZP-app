import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  template: `
    <div class="px-4 py-6 max-w-4xl mx-auto">
      <div class="mb-6">
        <a
          routerLink="/"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
        >
          ← Back to products
        </a>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>

      @if (cartService.cart().length === 0) {
      <div class="text-center py-12">
        <p class="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <a
          routerLink="/"
          class="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Shopping
        </a>
      </div>
      } @else {
      <div class="space-y-4">
        @for (product of cartService.cart(); track product.id) {
        <app-cart-item [product]="product" />
        }
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartService);
}
