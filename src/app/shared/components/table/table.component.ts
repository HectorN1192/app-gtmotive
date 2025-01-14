import {
  AfterViewInit,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorIntlEs } from '@shared/material';

@Component({
  selector: 'app-table',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs }],
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _fb = inject(FormBuilder);

  displayedColumns = input.required<{ key: string; label: string }[]>();
  data = input.required<T[]>();

  dataSource = new MatTableDataSource();
  columns: string[] = [];

  formSearch = this._fb.nonNullable.group({
    search: this._fb.nonNullable.control(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes['data'].currentValue;
  }

  ngOnInit(): void {
    this.columns = this.displayedColumns().map((column) => column.key);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this._paginator();
    this.dataSource.sort = this._sort();
    this.dataSource.data = this.data();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource && this.dataSource.paginator) {
      this.dataSource.paginator?.firstPage();
    }
  }
}
