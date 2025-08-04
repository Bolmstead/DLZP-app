import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-300 rounded-lg my-4 p-4 bg-white shadow-sm"
    >
      <img
        [src]="product().image"
        alt="product image"
        class="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-md flex-shrink-0"
      />
      <div class="flex-grow min-w-0">
        <p class="text-base font-bold text-gray-800 mb-1">
          {{ product().title }}
        </p>
        <p class="text-lg font-semibold text-green-600">
          {{ '$' + product().price.toFixed(2) }}
        </p>
      </div>
      <div class="w-full sm:w-auto sm:flex-shrink-0">
        <app-primary-button
          [label]="'Remove'"
          (btnClicked)="cartService.removeFromCart(product())"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class CartItemComponent {
  cartService = inject(CartService);
  product = input.required<Product>();
}
