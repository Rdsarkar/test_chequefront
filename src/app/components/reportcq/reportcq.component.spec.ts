import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcqComponent } from './reportcq.component';

describe('ReportcqComponent', () => {
  let component: ReportcqComponent;
  let fixture: ComponentFixture<ReportcqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportcqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
