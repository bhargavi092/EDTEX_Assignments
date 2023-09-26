import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatronComponent } from './viewpatron.component';

describe('ViewpatronComponent', () => {
  let component: ViewpatronComponent;
  let fixture: ComponentFixture<ViewpatronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpatronComponent]
    });
    fixture = TestBed.createComponent(ViewpatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
