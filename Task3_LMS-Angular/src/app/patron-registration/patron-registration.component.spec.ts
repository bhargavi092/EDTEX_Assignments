import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronRegistrationComponent } from './patron-registration.component';

describe('PatronRegistrationComponent', () => {
  let component: PatronRegistrationComponent;
  let fixture: ComponentFixture<PatronRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronRegistrationComponent]
    });
    fixture = TestBed.createComponent(PatronRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
