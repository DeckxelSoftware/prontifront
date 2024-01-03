import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoFacturaComponent } from './modal-info-factura.component';

describe('ModalInfoFacturaComponent', () => {
  let component: ModalInfoFacturaComponent;
  let fixture: ComponentFixture<ModalInfoFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
