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
      <div class="flex justify-center items-center mb-6 gap-3">
        <div class="text-gray-700">Filter by category:</div>
        <select
          class="border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          (change)="onCategoryChange($event)"
        >
          <option value="Sports, Hobbies, & Misc">
            Sports, Hobbies, & Misc
          </option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Fashion">Fashion</option>
          <option value="Movies, TV, & Games">Movies, TV, & Games</option>
        </select>
      </div>
      <div class="flex justify-center items-center mb-6 gap-3">
        <input
          type="text"
          placeholder="Or search..."
          class="border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
          (keyup.enter)="onSearch($event)"
          (input)="onSearchInput($event)"
        />
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition-colors"
          (click)="onSearchClick()"
        >
          Search
        </button>
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
    
    input::placeholder {
      color: #9ca3af;
      opacity: 1;
    }
    
    input::-webkit-input-placeholder {
      color: #9ca3af;
    }
    
    input::-moz-placeholder {
      color: #9ca3af;
      opacity: 1;
    }
  `,
})
export class ProductListComponent {
  productsService = inject(ProductsService);
  private apiService = inject(ApiService);
  products = this.productsService.products;

  private currentSearchTerm = signal<string>('');

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;

    console.log('Category changed to:', selectedCategory);
    this.loadProductsByCategory(selectedCategory);
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.currentSearchTerm.set(inputElement.value);
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.trim();
    if (searchTerm) {
      this.performSearch(searchTerm);
    }
  }

  onSearchClick() {
    const searchTerm = this.currentSearchTerm().trim();
    if (searchTerm) {
      this.performSearch(searchTerm);
    }
  }

  private performSearch(searchTerm: string) {
    console.log('Searching for:', searchTerm);

    // Set loading state
    this.productsService.setProductsLoading(true);

    // Make API call
    this.apiService.searchProducts(searchTerm).subscribe({
      next: (data: any) => {
        console.log('Search results:', data);
        const fetchedProducts: Product[] = [];

        // Handle the API response - assuming it has the same structure as category search
        const products = data.products || data; // Handle different response structures

        for (const item of products) {
          const numberPrice = Number(item.startingBid || item.price);
          const product: Product = {
            id: item.id,
            title: item.name || item.title,
            price: numberPrice,
            image: item.imageUrl || item.image,
          };
          fetchedProducts.push(product);
        }

        this.productsService.setProducts(fetchedProducts);
        this.productsService.setProductsLoading(false);
      },
      error: (error) => {
        console.error('Error searching products:', error);
        this.productsService.setProductsLoading(false);
      },
    });
  }

  private loadProductsByCategory(category: string) {
    // Set loading state
    this.productsService.setProductsLoading(true);

    // Make API call
    this.apiService.getProductsBySubCategory(category).subscribe({
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
