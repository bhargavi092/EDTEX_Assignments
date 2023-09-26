import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLeavesComponent } from './track-leaves.component';

describe('TrackLeavesComponent', () => {
  let component: TrackLeavesComponent;
  let fixture: ComponentFixture<TrackLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackLeavesComponent]
    });
    fixture = TestBed.createComponent(TrackLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
