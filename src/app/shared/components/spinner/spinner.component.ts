import { Component, inject } from '@angular/core';
import { SpinnerService } from '@shared/services';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  private readonly _spinnerService = inject(SpinnerService);
  isLoading = this._spinnerService.isLoading;
}
