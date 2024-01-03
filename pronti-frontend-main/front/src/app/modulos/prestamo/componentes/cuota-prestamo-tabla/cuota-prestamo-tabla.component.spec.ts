import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaPrestamoTablaComponent } from './cuota-prestamo-tabla.component';

describe('CuotaPrestamoTablaComponent', () => {
  let component: CuotaPrestamoTablaComponent;
  let fixture: ComponentFixture<CuotaPrestamoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotaPrestamoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotaPrestamoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
