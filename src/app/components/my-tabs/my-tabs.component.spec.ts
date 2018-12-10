import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTabsComponent } from './my-tabs.component';

describe('MyTabsComponent', () => {
  let component: MyTabsComponent;
  let fixture: ComponentFixture<MyTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
