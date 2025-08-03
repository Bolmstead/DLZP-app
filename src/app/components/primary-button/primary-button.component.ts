import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded-md"
      (click)="handleButtonClick()"
    >
      {{ label() }}
    </button>
  `,
  styles: ``,
})
export class PrimaryButtonComponent {
  label = input.required<string>();

  btnClicked = output<void>();

  handleButtonClick() {
    console.log('handleButtonClick executed');
    this.btnClicked.emit();
  }
}
