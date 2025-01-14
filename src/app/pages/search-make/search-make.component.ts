import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { loadMakes } from '@core/store/ngrx-store/actions';
import { AppState } from '@core/store/ngrx-store/app.reducers';
import { MakesState } from '@core/store/ngrx-store/reducers';
import { selectDataState } from '@core/store/ngrx-store/selectors';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-search-make',
  imports: [
    AsyncPipe,
    ScrollingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-make.component.html',
  styleUrl: './search-make.component.scss',
})
export class SearchMakeComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _store = inject(Store<AppState>);

  filterControl = new FormControl('');

  data$: Observable<MakesState> = this._store.select(selectDataState);

  ngOnInit(): void {
    /**
     * Carga los datos de las marcas en NgRx store.
     */
    this._store.dispatch(loadMakes());
  }

  /**
   * Filtra las marcas por nombre.
   */
  filteredItems$ = combineLatest([
    this.data$.pipe(map((data) => data.makes)),
    this.filterControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([items, filterValue]) =>
      items.filter((item) =>
        item.Make_Name.toLowerCase().includes(filterValue?.toLowerCase() || '')
      )
    )
  );

  navigateToDetails(id: number): void {
    this._router.navigate(['/details', id]);
  }
}
