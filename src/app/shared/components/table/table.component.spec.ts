import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<unknown>;
  let componentRef: ComponentRef<TableComponent<unknown>>;
  let fixture: ComponentFixture<TableComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('displayedColumns', [{ key: 'key', label: 'label' }]);
    componentRef.setInput('data', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
