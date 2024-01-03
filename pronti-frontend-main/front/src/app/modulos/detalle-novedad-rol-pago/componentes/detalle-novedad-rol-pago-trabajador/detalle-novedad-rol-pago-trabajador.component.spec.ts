import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNovedadRolPagoTrabajadorComponent } from './detalle-novedad-rol-pago-trabajador.component';

describe('DetalleNovedadRolPagoTrabajadorComponent', () => {
  let component: DetalleNovedadRolPagoTrabajadorComponent;
  let fixture: ComponentFixture<DetalleNovedadRolPagoTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleNovedadRolPagoTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNovedadRolPagoTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
