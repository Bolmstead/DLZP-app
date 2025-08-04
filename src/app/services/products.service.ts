import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = signal<Product[]>([]);
  productsLoading = signal<boolean>(false);
  setProducts(newProducts: Product[]) {
    console.log('setProducts --- newProducts:: ', newProducts);
    this.products.update((prev) => [...newProducts]);
  }
  setProductsLoading(isLoading: boolean) {
    this.productsLoading.set(isLoading);
  }

  constructor() {}
}
