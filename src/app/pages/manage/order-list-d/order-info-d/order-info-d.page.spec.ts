import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoDPage } from './order-info-d.page';

describe('OrderInfoDPage', () => {
  let component: OrderInfoDPage;
  let fixture: ComponentFixture<OrderInfoDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoDPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
