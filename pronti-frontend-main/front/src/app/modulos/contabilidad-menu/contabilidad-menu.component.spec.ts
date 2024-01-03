import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilidadMenuComponent } from './contabilidad-menu.component';

describe('ContabilidadMenuComponent', () => {
  let component: ContabilidadMenuComponent;
  let fixture: ComponentFixture<ContabilidadMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContabilidadMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContabilidadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
