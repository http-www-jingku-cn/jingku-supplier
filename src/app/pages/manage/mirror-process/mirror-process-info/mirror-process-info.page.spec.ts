import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorProcessInfoPage } from './mirror-process-info.page';

describe('MirrorProcessInfoPage', () => {
  let component: MirrorProcessInfoPage;
  let fixture: ComponentFixture<MirrorProcessInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirrorProcessInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorProcessInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
