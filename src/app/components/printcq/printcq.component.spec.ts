import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintcqComponent } from './printcq.component';

describe('PrintcqComponent', () => {
  let component: PrintcqComponent;
  let fixture: ComponentFixture<PrintcqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintcqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
