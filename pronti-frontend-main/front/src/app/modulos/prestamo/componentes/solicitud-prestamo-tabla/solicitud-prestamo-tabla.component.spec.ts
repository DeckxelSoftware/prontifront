import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPrestamoTablaComponent } from './solicitud-prestamo-tabla.component';

describe('SolicitudPrestamoTablaComponent', () => {
  let component: SolicitudPrestamoTablaComponent;
  let fixture: ComponentFixture<SolicitudPrestamoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPrestamoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPrestamoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
