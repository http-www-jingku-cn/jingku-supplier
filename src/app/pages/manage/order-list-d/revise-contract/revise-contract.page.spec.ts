import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseContractPage } from './revise-contract.page';

describe('ReviseContractPage', () => {
  let component: ReviseContractPage;
  let fixture: ComponentFixture<ReviseContractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseContractPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseContractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
