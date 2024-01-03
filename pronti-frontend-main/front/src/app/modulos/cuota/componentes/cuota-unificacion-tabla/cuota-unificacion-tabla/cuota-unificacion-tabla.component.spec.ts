import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaUnificacionTablaComponent } from './cuota-unificacion-tabla.component';

describe('CuotaUnificacionTablaComponent', () => {
  let component: CuotaUnificacionTablaComponent;
  let fixture: ComponentFixture<CuotaUnificacionTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotaUnificacionTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotaUnificacionTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
