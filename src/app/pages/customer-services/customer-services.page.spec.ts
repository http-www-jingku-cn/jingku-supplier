import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServicesPage } from './customer-services.page';

describe('CustomerServicesPage', () => {
  let component: CustomerServicesPage;
  let fixture: ComponentFixture<CustomerServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
