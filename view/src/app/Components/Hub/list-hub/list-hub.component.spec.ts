import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHubComponent } from './list-hub.component';

describe('ListHubComponent', () => {
  let component: ListHubComponent;
  let fixture: ComponentFixture<ListHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
