import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindtutorPage } from './findtutor.page';

describe('FindtutorPage', () => {
  let component: FindtutorPage;
  let fixture: ComponentFixture<FindtutorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindtutorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindtutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
