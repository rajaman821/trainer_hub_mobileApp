import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachereditprofilePage } from './teachereditprofile.page';

describe('TeachereditprofilePage', () => {
  let component: TeachereditprofilePage;
  let fixture: ComponentFixture<TeachereditprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachereditprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachereditprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
