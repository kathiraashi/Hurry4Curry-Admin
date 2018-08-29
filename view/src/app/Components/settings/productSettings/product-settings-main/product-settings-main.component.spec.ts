import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSettingsMainComponent } from './product-settings-main.component';

describe('ProductSettingsMainComponent', () => {
  let component: ProductSettingsMainComponent;
  let fixture: ComponentFixture<ProductSettingsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSettingsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSettingsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
