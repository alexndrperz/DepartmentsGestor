import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEncComponent } from './products-enc.component';

describe('ProductsEncComponent', () => {
  let component: ProductsEncComponent;
  let fixture: ComponentFixture<ProductsEncComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsEncComponent]
    });
    fixture = TestBed.createComponent(ProductsEncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
