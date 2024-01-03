import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDevolucionComponent } from './ruta-devolucion.component';

describe('RutaDevolucionComponent', () => {
  let component: RutaDevolucionComponent;
  let fixture: ComponentFixture<RutaDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaDevolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
