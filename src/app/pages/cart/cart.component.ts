import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  template: `
    <div>
      <a routerLink="/">Back to products</a>
      <h1>Cart</h1>
      <div>
        @for (product of cartService.cart(); track product.id) {
        <app-cart-item [product]="product" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartService);
}
