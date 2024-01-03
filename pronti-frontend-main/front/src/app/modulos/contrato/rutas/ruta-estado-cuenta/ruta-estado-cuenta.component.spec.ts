import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEstadoCuentaComponent } from './ruta-estado-cuenta.component';

describe('RutaEstadoCuentaComponent', () => {
  let component: RutaEstadoCuentaComponent;
  let fixture: ComponentFixture<RutaEstadoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaEstadoCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
