import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintColumnComponent } from './print-column.component';

describe('PrintColumnComponent', () => {
  let component: PrintColumnComponent;
  let fixture: ComponentFixture<PrintColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
