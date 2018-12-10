import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteExpressNumberPage } from './write-express-number.page';

describe('WriteExpressNumberPage', () => {
  let component: WriteExpressNumberPage;
  let fixture: ComponentFixture<WriteExpressNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteExpressNumberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteExpressNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
