import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="border border-gray-300 rounded-md p-4 bg-white shadow-md  flex flex-col"
    >
      <img [src]="product().image" alt="product image" />
      <p class="text-sm font-bold">{{ product().title }}</p>
      <p class="text-sm">{{ '$' + product().price }}</p>
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
