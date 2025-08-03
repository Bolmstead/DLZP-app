import { Component, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-product-list-component',
  imports: [ProductCardComponent],
  template: `
    <div class="px-4 py-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
      >
        @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductListComponent {
  // placeholder products
  products = signal<Product[]>([
    {
      id: 1,
      title: 'Mike and Ikes',
      price: 100,
      image:
        'https://www.mikeandike.com/wp-content/uploads/sites/76/2024/05/MI-Orig.webp',
    },
    {
      id: 2,
      title: 'Circus Peanuts',
      price: 200,
      image:
        'https://res.cloudinary.com/nassau-candy/image/upload/c_fit,w_1000,h_1000,f_auto/19071.jpg',
    },
    {
      id: 3,
      title: 'Necco Wafers',
      price: 300,
      image:
        'https://www.candy-bouquet.ca/cdn/shop/products/61mr7wtnlxl_1000x.jpg?v=1625344129',
    },
  ]);
}
