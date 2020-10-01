import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundedComponent } from './refunded.component';

describe('RefundedComponent', () => {
  let component: RefundedComponent;
  let fixture: ComponentFixture<RefundedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
