import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedPayComponent } from './requested-pay.component';

describe('RequestedPayComponent', () => {
  let component: RequestedPayComponent;
  let fixture: ComponentFixture<RequestedPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
