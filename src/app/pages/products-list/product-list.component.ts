import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';

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
  private productsService = inject(ProductsService);
  products = this.productsService.products;
}
