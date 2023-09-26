import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronloginComponent } from './patronlogin.component';

describe('PatronloginComponent', () => {
  let component: PatronloginComponent;
  let fixture: ComponentFixture<PatronloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronloginComponent]
    });
    fixture = TestBed.createComponent(PatronloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
