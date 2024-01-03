import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPrestamoPerfilComponent } from './solicitud-prestamo-perfil.component';

describe('SolicitudPrestamoPerfilComponent', () => {
  let component: SolicitudPrestamoPerfilComponent;
  let fixture: ComponentFixture<SolicitudPrestamoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPrestamoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPrestamoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
