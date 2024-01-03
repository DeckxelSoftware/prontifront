import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoTablaComponent } from './ingreso-tabla.component';

describe('IngresoTablaComponent', () => {
  let component: IngresoTablaComponent;
  let fixture: ComponentFixture<IngresoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
