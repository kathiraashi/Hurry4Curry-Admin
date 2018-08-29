import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProductUnitOfMeasureComponent } from './model-product-unit-of-measure.component';

describe('ModelProductUnitOfMeasureComponent', () => {
  let component: ModelProductUnitOfMeasureComponent;
  let fixture: ComponentFixture<ModelProductUnitOfMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelProductUnitOfMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProductUnitOfMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
