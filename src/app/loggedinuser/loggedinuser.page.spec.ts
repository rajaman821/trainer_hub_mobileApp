import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinuserPage } from './loggedinuser.page';

describe('LoggedinuserPage', () => {
  let component: LoggedinuserPage;
  let fixture: ComponentFixture<LoggedinuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedinuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
