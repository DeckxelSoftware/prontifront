import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesMenuComponent } from './novedades-menu.component';

describe('NovedadesMenuComponent', () => {
  let component: NovedadesMenuComponent;
  let fixture: ComponentFixture<NovedadesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovedadesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
