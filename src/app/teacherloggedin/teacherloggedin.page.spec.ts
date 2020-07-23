import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherloggedinPage } from './teacherloggedin.page';

describe('TeacherloggedinPage', () => {
  let component: TeacherloggedinPage;
  let fixture: ComponentFixture<TeacherloggedinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherloggedinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherloggedinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
