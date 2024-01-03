import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobacionPrestamoComponent } from './modal-aprobacion-prestamo.component';

describe('ModalAprobacionPrestamoComponent', () => {
  let component: ModalAprobacionPrestamoComponent;
  let fixture: ComponentFixture<ModalAprobacionPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAprobacionPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprobacionPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
