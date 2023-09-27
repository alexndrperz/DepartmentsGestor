import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEncComponent } from './solicitudes-enc.component';

describe('SolicitudesEncComponent', () => {
  let component: SolicitudesEncComponent;
  let fixture: ComponentFixture<SolicitudesEncComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesEncComponent]
    });
    fixture = TestBed.createComponent(SolicitudesEncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
