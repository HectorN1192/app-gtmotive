import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  clearVehiclesType,
  loadVehiclesType,
} from '@core/store/ngrx-store/actions';
import { AppState } from '@core/store/ngrx-store/app.reducers';
import { selectMappedVehicleTypes } from '@core/store/ngrx-store/selectors';
import { ModelSignalStore } from '@core/store/signal';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/components';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-make-detail',
  imports: [AsyncPipe, TableComponent, MatIconModule],
  templateUrl: './make-detail.component.html',
  styleUrl: './make-detail.component.scss',
})
export class MakeDetailComponent implements OnInit, OnDestroy {
  @Input() id!: string;

  private readonly _router = inject(Router);
  private readonly _store = inject(Store<AppState>);
  readonly signalStore = inject(ModelSignalStore);

  dataTitle = computed(() => {
    const data = this.signalStore.vehiclesModel().at(0);
    return data ? `${data?.Make_ID} - ${data?.Make_Name}` : '';
  });

  displayedColumnsModel = [
    { key: 'modelId', label: 'Id Modelo' },
    { key: 'modelName', label: 'Nombre modelo' },
  ];

  displayedColumnsType = [
    { key: 'typeId', label: 'Id Tipo' },
    { key: 'typeName', label: 'Nombre Tipo vehiculo' },
  ];

  /**
   * Observable que contiene los datos de los tipos de vehiculos,
   * se obtienen desde NgRx store.
   * Utilizamos el selector selectMappedVehicleTypes para mapear los datos.
   */
  dataType$: Observable<{ typeId: number; typeName: string }[]> =
    this._store.select(selectMappedVehicleTypes);

  ngOnInit(): void {
    /**
     * Carga los datos de los modelos en Signal Store,
     * accedemos a estos datos directamente en el html,
     * ya que tenemos los datos mapeados desde el metodo computed() - modelsTable().
     */
    this.signalStore.loadModels(this.id);

    /**
     * Carga los datos de los tipos de vehiculos en NgRx store.
     */
    this._store.dispatch(loadVehiclesType({ id: this.id }));
  }

  goToHome() {
    this._router.navigate(['/']);
  }

  ngOnDestroy(): void {
    /**
     * Limpia los datos de los modelos en Signal Store.
     */
    this.signalStore.clearModels();

    /**
     * Limpia los datos de los tipos de vehiculos en NgRx store.
     */
    this._store.dispatch(clearVehiclesType());
  }
}
