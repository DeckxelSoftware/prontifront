import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioTablaComponent } from './beneficio-tabla.component';

describe('BeneficioTablaComponent', () => {
  let component: BeneficioTablaComponent;
  let fixture: ComponentFixture<BeneficioTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficioTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
