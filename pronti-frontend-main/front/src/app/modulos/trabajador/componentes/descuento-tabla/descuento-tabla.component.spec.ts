import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoTablaComponent } from './descuento-tabla.component';

describe('DescuentoTablaComponent', () => {
  let component: DescuentoTablaComponent;
  let fixture: ComponentFixture<DescuentoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescuentoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
