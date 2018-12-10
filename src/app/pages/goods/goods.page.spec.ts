import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPage } from './goods.page';

describe('GoodsPage', () => {
  let component: GoodsPage;
  let fixture: ComponentFixture<GoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
