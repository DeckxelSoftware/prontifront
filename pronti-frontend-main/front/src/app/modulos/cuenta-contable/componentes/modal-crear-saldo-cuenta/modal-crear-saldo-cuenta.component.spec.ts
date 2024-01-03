import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearSaldoCuentaComponent } from './modal-crear-saldo-cuenta.component';

describe('ModalCrearSaldoCuentaComponent', () => {
  let component: ModalCrearSaldoCuentaComponent;
  let fixture: ComponentFixture<ModalCrearSaldoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearSaldoCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearSaldoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
