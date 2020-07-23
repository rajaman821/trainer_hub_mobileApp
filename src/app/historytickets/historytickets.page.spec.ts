import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryticketsPage } from './historytickets.page';

describe('HistoryticketsPage', () => {
  let component: HistoryticketsPage;
  let fixture: ComponentFixture<HistoryticketsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryticketsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryticketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
