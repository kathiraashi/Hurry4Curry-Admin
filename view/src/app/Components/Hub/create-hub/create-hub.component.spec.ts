import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHubComponent } from './create-hub.component';

describe('CreateHubComponent', () => {
  let component: CreateHubComponent;
  let fixture: ComponentFixture<CreateHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
