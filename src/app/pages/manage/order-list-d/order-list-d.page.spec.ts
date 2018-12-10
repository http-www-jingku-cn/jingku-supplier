import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListDPage } from './order-list-d.page';

describe('OrderListDPage', () => {
  let component: OrderListDPage;
  let fixture: ComponentFixture<OrderListDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListDPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
