import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEditarContratoComponent } from './ruta-editar-contrato.component';

describe('RutaEditarContratoComponent', () => {
  let component: RutaEditarContratoComponent;
  let fixture: ComponentFixture<RutaEditarContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaEditarContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEditarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
