import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOrderPage } from './ship-order.page';

describe('ShipOrderPage', () => {
  let component: ShipOrderPage;
  let fixture: ComponentFixture<ShipOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
