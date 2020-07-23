import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserinfoPage } from './edituserinfo.page';

describe('EdituserinfoPage', () => {
  let component: EdituserinfoPage;
  let fixture: ComponentFixture<EdituserinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
