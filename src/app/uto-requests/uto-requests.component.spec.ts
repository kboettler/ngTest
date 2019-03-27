import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtoRequestsComponent } from './uto-requests.component';

describe('UtoRequestsComponent', () => {
  let component: UtoRequestsComponent;
  let fixture: ComponentFixture<UtoRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtoRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
