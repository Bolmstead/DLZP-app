import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list-component',
  imports: [ProductCardComponent],
  template: `
    <div class="px-4 py-6 max-w-7xl mx-auto">
      <div class="flex justify-center mb-2">
        <div class="text-gray-700 mr-2">Filter products by category:</div>
      </div>
      <div class="flex justify-center mb-6">
        <select
          class="border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          (change)="onCategoryChange($event)"
        >
          <option value="all">Sports, Hobbies, & Misc</option>
          <option value="candy">Candy</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      @if (productsService.productsLoading()) {
      <div class="flex justify-center items-center py-12">
        <div class="loading-spinner"></div>
        <span class="ml-3 text-gray-600">Loading products...</span>
      </div>
      } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
        }
      </div>
      }
    </div>
  `,
  styles: `
    .loading-spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #e5e7eb;
      border-top: 3px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
})
export class ProductListComponent {
  productsService = inject(ProductsService);
  private apiService = inject(ApiService);
  products = this.productsService.products;

  // Map select values to API subcategories
  private categoryMap: { [key: string]: string } = {
    all: 'Cell Phones and Accessories', // Default category
    electronics: 'Cell Phones and Accessories',
    candy: 'Health and Beauty',
    clothing: 'Clothing and Accessories',
  };

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;

    console.log('Category changed to:', selectedCategory);
    this.loadProductsByCategory(selectedCategory);
  }

  private loadProductsByCategory(category: string) {
    const apiCategory =
      this.categoryMap[category] || 'Cell Phones and Accessories';

    // Set loading state
    this.productsService.setProductsLoading(true);

    // Make API call
    this.apiService.getProductsBySubCategory(apiCategory).subscribe({
      next: (data) => {
        console.log('Products loaded for category:', category, data);
        const fetchedProducts: Product[] = [];

        for (const item of data.products) {
          const numberPrice = Number(item.startingBid);
          const product: Product = {
            id: item.id,
            title: item.name,
            price: numberPrice,
            image: item.imageUrl,
          };
          fetchedProducts.push(product);
        }

        this.productsService.setProducts(fetchedProducts);
        this.productsService.setProductsLoading(false);
      },
      error: (error) => {
        console.error('Error loading products for category:', category, error);
        this.productsService.setProductsLoading(false);
      },
    });
  }
}
