import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherdetailsPage } from './teacherdetails.page';

describe('TeacherdetailsPage', () => {
  let component: TeacherdetailsPage;
  let fixture: ComponentFixture<TeacherdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
