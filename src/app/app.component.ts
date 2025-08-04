import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './services/api.service';
import { Product } from '../models/products.model';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, JsonPipe],
  template: `
    <app-header />
    <router-outlet />

    <!-- Example of displaying loading state and data -->
    <div style="padding: 20px;">
      @if (isLoading()) {
      <p></p>
      } @else if (apiData()) {
      <h3>API Data Loaded:</h3>
      <pre>{{ apiData() | json }}</pre>
      } @else if (error()) {
      <p style="color: red;">Error: {{ error() }}</p>
      }
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'angular-DLZP';

  // Inject your API service
  private apiService = inject(ApiService);
  private productsService = inject(ProductsService);
  // Signals for reactive state management
  apiData = signal<any>(null);
  isLoading = this.productsService.productsLoading;
  error = signal<string | null>(null);

  ngOnInit() {
    // This runs when the component loads
    this.loadInitialData();
  }

  private loadInitialData() {
    this.productsService.setProductsLoading(true);
    this.error.set(null);

    // Example API call using the service
    this.apiService
      .getProductsBySubCategory('Cell Phones and Accessories')
      .subscribe({
        next: (data) => {
          console.log('API data loaded:', data);
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
          console.log(
            'productsService.products():: ',
            this.productsService.products()
          );
          this.productsService.setProductsLoading(false);
        },
        error: (error) => {
          console.error('Error loading data:', error);
          this.error.set(error.message || 'Failed to load data');
          this.productsService.setProductsLoading(false);
        },
      });
  }
}
