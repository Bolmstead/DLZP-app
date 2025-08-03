import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/products-list/product-list.component';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent,
  },
];
