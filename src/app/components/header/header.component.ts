import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-slate-100 px-4 py-4 shadow-md flex justify-between items-center"
    >
      <h1 class="text-lg sm:text-xl font-bold text-gray-800 truncate mr-4">
        Berkley's DLZP Angular App
      </h1>
      <div class="flex-shrink-0 min-w-0">
        <app-primary-button
          [label]="'Cart (' + cartService.cart().length + ')'"
          (btnClicked)="btnClick()"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);
  router = inject(Router);

  btnClick() {
    console.log(' button clicked');
    this.router.navigate(['cart']);
  }
}
