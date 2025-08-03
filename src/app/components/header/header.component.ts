import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: ` <p>{{ title() }}</p> `,
  styles: ``,
})
export class HeaderComponent {
  title = signal("Berkley's DLZP Angular App");
}
