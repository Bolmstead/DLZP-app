import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div
      class="bg-slate-100 px-4 py-3 shadow-md flex justify-between items-center"
      routerLink="/"
    >
      Berkley's DLZP Angular App
      <app-primary-button
        [label]="'Cart(' + cartService.cart().length + ')'"
        (btnClicked)="btnClick()"
        routerLink="/cart"
      />
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);
  btnClick() {
    console.log(' button clicked');
  }
}
