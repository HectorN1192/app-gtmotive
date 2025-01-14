import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent, SpinnerComponent } from '@shared/components';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gtmotive';
}
