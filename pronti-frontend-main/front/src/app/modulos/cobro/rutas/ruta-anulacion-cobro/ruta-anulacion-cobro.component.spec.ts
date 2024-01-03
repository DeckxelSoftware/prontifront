import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAnulacionCobroComponent } from './ruta-anulacion-cobro.component';

describe('RutaAnulacionCobroComponent', () => {
  let component: RutaAnulacionCobroComponent;
  let fixture: ComponentFixture<RutaAnulacionCobroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAnulacionCobroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAnulacionCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
