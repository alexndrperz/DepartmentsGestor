import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadosComponent } from './encargados.component';

describe('EncargadosComponent', () => {
  let component: EncargadosComponent;
  let fixture: ComponentFixture<EncargadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncargadosComponent]
    });
    fixture = TestBed.createComponent(EncargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
