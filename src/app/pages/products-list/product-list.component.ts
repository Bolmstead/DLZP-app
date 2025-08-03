import { Component, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-product-list-component',
  imports: [ProductCardComponent],
  template: `
    <div class="grid grid-cols-3 gap-4">
      @for (product of products(); track product.id) {
      <app-product-card [product]="product" />
      }
    </div>
  `,
  styles: ``,
})
export class ProductListComponent {
  products = signal<Product[]>([
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      image:
        'https://www.adobe.com/creativecloud/photography/type/media_1edd1c2b865853b2b14c35c715ab6798c2fb2bfd4.jpg?width=750&format=webply&optimize=medium',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      image:
        'https://www.adobe.com/creativecloud/photography/type/media_1edd1c2b865853b2b14c35c715ab6798c2fb2bfd4.jpg?width=750&format=webply&optimize=medium',
    },
    {
      id: 3,
      title: 'Product 3',
      price: 300,
      image:
        'https://www.adobe.com/creativecloud/photography/type/media_1edd1c2b865853b2b14c35c715ab6798c2fb2bfd4.jpg?width=750&format=webply&optimize=medium',
    },
  ]);
}
