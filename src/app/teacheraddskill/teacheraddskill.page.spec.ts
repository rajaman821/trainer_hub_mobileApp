import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheraddskillPage } from './teacheraddskill.page';

describe('TeacheraddskillPage', () => {
  let component: TeacheraddskillPage;
  let fixture: ComponentFixture<TeacheraddskillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacheraddskillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacheraddskillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
