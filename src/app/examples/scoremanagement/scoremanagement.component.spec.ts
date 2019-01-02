import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoremanagementComponent } from './scoremanagement.component';

describe('ScoremanagementComponent', () => {
  let component: ScoremanagementComponent;
  let fixture: ComponentFixture<ScoremanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoremanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoremanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
