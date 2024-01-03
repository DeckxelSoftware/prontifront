import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosElectronicosMenuComponent } from './documentos-electronicos-menu.component';

describe('DocumentosElectronicosMenuComponent', () => {
  let component: DocumentosElectronicosMenuComponent;
  let fixture: ComponentFixture<DocumentosElectronicosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosElectronicosMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosElectronicosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
