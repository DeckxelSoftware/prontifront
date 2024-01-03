import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInicialCrearProveedorComponent } from './modal-inicial-crear-proveedor.component';

describe('ModalInicialCrearProveedorComponent', () => {
  let component: ModalInicialCrearProveedorComponent;
  let fixture: ComponentFixture<ModalInicialCrearProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInicialCrearProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInicialCrearProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
