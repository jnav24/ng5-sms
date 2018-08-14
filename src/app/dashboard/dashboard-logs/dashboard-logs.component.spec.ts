import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLogsComponent } from './dashboard-logs.component';

describe('DashboardLogsComponent', () => {
  let component: DashboardLogsComponent;
  let fixture: ComponentFixture<DashboardLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
