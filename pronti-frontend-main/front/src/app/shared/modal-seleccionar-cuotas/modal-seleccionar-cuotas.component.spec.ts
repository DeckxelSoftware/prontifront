import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionarCuotasComponent } from './modal-seleccionar-cuotas.component';

describe('ModalSeleccionarCuotasComponent', () => {
  let component: ModalSeleccionarCuotasComponent;
  let fixture: ComponentFixture<ModalSeleccionarCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSeleccionarCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionarCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
