import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="border border-gray-300 rounded-lg p-4 bg-white shadow-md flex flex-col h-full"
    >
      <img
        [src]="product().image"
        alt="product image"
        class="w-64 h-64 object-contain rounded-md mb-3 mx-auto"
      />
      <div class="flex-grow">
        <p class="text-base font-bold mb-2">{{ product().title }}</p>
        <p class="text-lg font-semibold text-green-600 mb-4">
          {{ '$' + product().price }}
        </p>
      </div>
      <app-primary-button
        [label]="'Add to cart'"
        (btnClicked)="cartService.addToCart(product())"
        [disabled]="isButtonDisabled()"
      />
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  cartService = inject(CartService);
  product = input.required<Product>();
  // checks if the product is already in the cart
  isButtonDisabled = computed(() => {
    const cartButtonDisabled = this.cartService
      .cart()
      .some((p) => p.id === this.product().id);
    console.log('cartButtonDisabled:: ', cartButtonDisabled);
    return cartButtonDisabled;
  });
}
