import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPieChartComponent } from './server-pie-chart.component';

describe('ServerPieChartComponent', () => {
  let component: ServerPieChartComponent;
  let fixture: ComponentFixture<ServerPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
