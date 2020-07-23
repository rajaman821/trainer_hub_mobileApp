import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewteachersPage } from './viewteachers.page';

describe('ViewteachersPage', () => {
  let component: ViewteachersPage;
  let fixture: ComponentFixture<ViewteachersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewteachersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewteachersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
