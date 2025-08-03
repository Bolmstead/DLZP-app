import { Component, input } from '@angular/core';
import { Product } from '../../../../models/products.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  template: `
    <div
      class="border border-gray-300 rounded-md p-4 bg-white shadow-md  flex flex-col"
    >
      <img [src]="product().image" alt="product image" />
      <p class="text-sm font-bold">{{ product().title }}</p>
      <p class="text-sm font-bold">{{ product().price }}</p>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
