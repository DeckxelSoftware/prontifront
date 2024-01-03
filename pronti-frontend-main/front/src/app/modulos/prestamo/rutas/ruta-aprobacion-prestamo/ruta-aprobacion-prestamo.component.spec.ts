import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAprobacionPrestamoComponent } from './ruta-aprobacion-prestamo.component';

describe('RutaAprobacionPrestamoComponent', () => {
  let component: RutaAprobacionPrestamoComponent;
  let fixture: ComponentFixture<RutaAprobacionPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAprobacionPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAprobacionPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
