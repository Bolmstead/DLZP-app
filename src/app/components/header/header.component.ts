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
      <div class="flex items-center mr-4">
        <h1 class="text-lg sm:text-xl font-bold text-gray-800 truncate">
          Berkley's DLZP Angular Shopping App
        </h1>
        <div class="info-tooltip ml-2">
          <div class="info-icon">ⓘ</div>
          <div class="tooltip-content">
            Hi, my name is Berkley Olmstead, an applicant for the Full Stack
            Developer role at DLZP. I don't have experience with Angular and I
            learned it is the frontend framework DLZP uses. <br /><br />So, I
            decided to learn the basics of Angular and build this site using the
            framework. It is a fake shopping website with an AI chatbot that
            utilizes the Anthropic API. <br /><br />Please feel free to email me
            if you have any questions: olms2074&#64;gmail.com. Thank you!
          </div>
        </div>
      </div>

      <div class="flex-shrink-0 min-w-0">
        <app-primary-button
          [label]="'Cart (' + cartService.cart().length + ')'"
          (btnClicked)="btnClick()"
        />
      </div>
    </div>
  `,
  styles: `
    .info-tooltip {
      position: relative;
      display: inline-block;
    }

    .info-icon {

      color: black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      cursor: help;
      transition: all 0.2s ease;
    }



    .tooltip-content {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: 125%;
      left: 50%;
      transform: translateX(-50%);
      background: #1f2937;
      color: white;
      text-align: center;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 14px;
      line-height: 1.4;
      white-space: nowrap;
      width: 400px;
      white-space: normal;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .tooltip-content::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -6px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent #1f2937 transparent;
    }

    .info-tooltip:hover .tooltip-content {
      visibility: visible;
      opacity: 1;
      transform: translateX(-50%) translateY(5px);
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .tooltip-content {
        max-width: 250px;
        font-size: 13px;
        padding: 10px 12px;
        top: 130%;
      }
      
      .info-icon {
        width: 18px;
        height: 18px;
        font-size: 11px;
      }
    }

    /* For very small screens, position tooltip to the left */
    @media (max-width: 480px) {
      .tooltip-content {
        left: 0;
        transform: translateX(0);
        max-width: 200px;
      }
      
      .tooltip-content::after {
        left: 20px;
        margin-left: -6px;
      }
      
      .info-tooltip:hover .tooltip-content {
        transform: translateX(0) translateY(5px);
      }
    }
  `,
})
export class HeaderComponent {
  cartService = inject(CartService);
  router = inject(Router);

  btnClick() {
    console.log(' button clicked');
    this.router.navigate(['cart']);
  }
}
