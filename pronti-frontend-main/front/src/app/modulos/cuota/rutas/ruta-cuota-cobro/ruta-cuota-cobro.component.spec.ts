import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCuotaCobroComponent } from './ruta-cuota-cobro.component';

describe('RutaCuotaCobroComponent', () => {
  let component: RutaCuotaCobroComponent;
  let fixture: ComponentFixture<RutaCuotaCobroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCuotaCobroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCuotaCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
