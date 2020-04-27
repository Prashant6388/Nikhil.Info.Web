import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtNetworkDevicesComponent } from './pt-network-devices.component';

describe('PtNetworkDevicesComponent', () => {
  let component: PtNetworkDevicesComponent;
  let fixture: ComponentFixture<PtNetworkDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtNetworkDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtNetworkDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
