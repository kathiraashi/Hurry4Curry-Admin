import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitOfMeasureComponent } from './product-unit-of-measure.component';

describe('ProductUnitOfMeasureComponent', () => {
  let component: ProductUnitOfMeasureComponent;
  let fixture: ComponentFixture<ProductUnitOfMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUnitOfMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUnitOfMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
