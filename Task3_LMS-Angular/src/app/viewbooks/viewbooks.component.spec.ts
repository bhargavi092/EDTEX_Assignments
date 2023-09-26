import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbooksComponent } from './viewbooks.component';

describe('ViewbooksComponent', () => {
  let component: ViewbooksComponent;
  let fixture: ComponentFixture<ViewbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewbooksComponent]
    });
    fixture = TestBed.createComponent(ViewbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
