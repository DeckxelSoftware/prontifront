import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaReactivarContratoComponent } from './ruta-reactivar-contrato.component';

describe('RutaReactivarContratoComponent', () => {
  let component: RutaReactivarContratoComponent;
  let fixture: ComponentFixture<RutaReactivarContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaReactivarContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaReactivarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
