import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaInformeIngresosComponent } from './ruta-informe-ingresos.component';

describe('RutaInformeIngresosComponent', () => {
  let component: RutaInformeIngresosComponent;
  let fixture: ComponentFixture<RutaInformeIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaInformeIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaInformeIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
