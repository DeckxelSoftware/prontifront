import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDetalleNovedadRolPagoTrabajadorComponent } from './ruta-detalle-novedad-rol-pago-trabajador.component';

describe('RutaDetalleNovedadRolPagoTrabajadorComponent', () => {
  let component: RutaDetalleNovedadRolPagoTrabajadorComponent;
  let fixture: ComponentFixture<RutaDetalleNovedadRolPagoTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaDetalleNovedadRolPagoTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDetalleNovedadRolPagoTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
