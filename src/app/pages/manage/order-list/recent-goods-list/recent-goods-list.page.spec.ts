import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGoodsListPage } from './recent-goods-list.page';

describe('RecentGoodsListPage', () => {
  let component: RecentGoodsListPage;
  let fixture: ComponentFixture<RecentGoodsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentGoodsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentGoodsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
