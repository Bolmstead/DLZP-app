import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-slate-100 px-4 py-3 shadow-md flex justify-between items-center"
    >
      Berkley's DLZP Angular App
      <app-primary-button
        [label]="'Cart(' + cartService.cart().length + ')'"
        (btnClicked)="btnClick()"
      />
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
