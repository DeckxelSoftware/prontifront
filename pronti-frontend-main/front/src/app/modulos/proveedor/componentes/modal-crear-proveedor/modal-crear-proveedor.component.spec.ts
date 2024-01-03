import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearProveedorComponent } from './modal-crear-proveedor.component';

describe('ModalCrearProveedorComponent', () => {
  let component: ModalCrearProveedorComponent;
  let fixture: ComponentFixture<ModalCrearProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
