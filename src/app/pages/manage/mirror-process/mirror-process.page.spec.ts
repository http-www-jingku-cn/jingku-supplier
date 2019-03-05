import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorProcessPage } from './mirror-process.page';

describe('MirrorProcessPage', () => {
  let component: MirrorProcessPage;
  let fixture: ComponentFixture<MirrorProcessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirrorProcessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
