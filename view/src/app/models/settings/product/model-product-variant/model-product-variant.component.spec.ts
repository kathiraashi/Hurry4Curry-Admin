import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProductVariantComponent } from './model-product-variant.component';

describe('ModelProductVariantComponent', () => {
  let component: ModelProductVariantComponent;
  let fixture: ComponentFixture<ModelProductVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelProductVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProductVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
