import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="flex items-center gap-4 border border-gray-300 rounded-md p-4">
      <img [src]="product().image" alt="product image" />
      <div>
        <p class="text-sm font-bold">{{ product().title }}</p>
        <p class="text-sm">{{ '$' + product().price }}</p>
      </div>
      <app-primary-button
        [label]="'Remove'"
        (btnClicked)="cartService.removeFromCart(product())"
      />
    </div>
  `,
  styles: ``,
})
export class CartItemComponent {
  cartService = inject(CartService);
  product = input.required<Product>();
}
