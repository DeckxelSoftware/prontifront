import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLicitacionComponent } from './modal-licitacion.component';

describe('ModalLicitacionComponent', () => {
  let component: ModalLicitacionComponent;
  let fixture: ComponentFixture<ModalLicitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLicitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLicitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
