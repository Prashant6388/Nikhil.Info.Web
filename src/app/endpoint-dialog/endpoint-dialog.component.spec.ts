import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointDialogComponent } from './endpoint-dialog.component';

describe('EndpointDialogComponent', () => {
  let component: EndpointDialogComponent;
  let fixture: ComponentFixture<EndpointDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
