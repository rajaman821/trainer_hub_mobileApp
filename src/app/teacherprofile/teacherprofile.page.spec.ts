import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherprofilePage } from './teacherprofile.page';

describe('TeacherprofilePage', () => {
  let component: TeacherprofilePage;
  let fixture: ComponentFixture<TeacherprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
