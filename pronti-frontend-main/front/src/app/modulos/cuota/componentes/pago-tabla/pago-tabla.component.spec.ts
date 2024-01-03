import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoTablaComponent } from './pago-tabla.component';

describe('PagoTablaComponent', () => {
  let component: PagoTablaComponent;
  let fixture: ComponentFixture<PagoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
