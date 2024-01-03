import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresMenuComponent } from './proveedores-menu.component';

describe('ProveedoresMenuComponent', () => {
  let component: ProveedoresMenuComponent;
  let fixture: ComponentFixture<ProveedoresMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
