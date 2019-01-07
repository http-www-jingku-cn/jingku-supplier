import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeBrowserPage } from './iframe-browser.page';

describe('IframeBrowserPage', () => {
  let component: IframeBrowserPage;
  let fixture: ComponentFixture<IframeBrowserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeBrowserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeBrowserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
