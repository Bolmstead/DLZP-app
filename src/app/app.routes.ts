import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/products-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent,
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
