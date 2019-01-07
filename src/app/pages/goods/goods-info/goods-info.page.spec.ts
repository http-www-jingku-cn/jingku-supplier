import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsInfoPage } from './goods-info.page';

describe('GoodsInfoPage', () => {
  let component: GoodsInfoPage;
  let fixture: ComponentFixture<GoodsInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
