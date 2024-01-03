import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDesistirComponent } from './ruta-desistir.component';

describe('RutaDesistirComponent', () => {
  let component: RutaDesistirComponent;
  let fixture: ComponentFixture<RutaDesistirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaDesistirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDesistirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
