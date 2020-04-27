import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaServersComponent } from './va-servers.component';

describe('VaServersComponent', () => {
  let component: VaServersComponent;
  let fixture: ComponentFixture<VaServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
