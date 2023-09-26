import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatronComponent } from './addpatron.component';

describe('AddpatronComponent', () => {
  let component: AddpatronComponent;
  let fixture: ComponentFixture<AddpatronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpatronComponent]
    });
    fixture = TestBed.createComponent(AddpatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
