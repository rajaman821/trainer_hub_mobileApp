import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherskillPage } from './teacherskill.page';

describe('TeacherskillPage', () => {
  let component: TeacherskillPage;
  let fixture: ComponentFixture<TeacherskillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherskillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherskillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
