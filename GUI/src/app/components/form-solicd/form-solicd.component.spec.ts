import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicdComponent } from './form-solicd.component';

describe('FormSolicdComponent', () => {
  let component: FormSolicdComponent;
  let fixture: ComponentFixture<FormSolicdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSolicdComponent]
    });
    fixture = TestBed.createComponent(FormSolicdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
