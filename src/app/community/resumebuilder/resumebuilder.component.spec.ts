import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumebuilderComponent } from './resumebuilder.component';

describe('ResumebuilderComponent', () => {
  let component: ResumebuilderComponent;
  let fixture: ComponentFixture<ResumebuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumebuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumebuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
