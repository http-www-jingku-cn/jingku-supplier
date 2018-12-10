import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountInputComponent } from './count-input.component';

describe('CountInputComponent', () => {
  let component: CountInputComponent;
  let fixture: ComponentFixture<CountInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
