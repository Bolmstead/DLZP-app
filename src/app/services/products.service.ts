import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = signal<Product[]>([]);

  setProducts(newProducts: Product[]) {
    console.log('setProducts --- newProducts:: ', newProducts);
    this.products.update((prev) => [...newProducts]);
  }

  constructor() {}
}
