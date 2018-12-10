import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 's-my-tabs',
  templateUrl: './my-tabs.component.html',
  styleUrls: ['./my-tabs.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTabsComponent implements OnInit {

  slideOpts: Object;
  @Input() slides: any[] = [];
  @Input() slidesPerView: number = 5;
  @Input() selectedIndex: number = 0;
  @Output() slideClick = new EventEmitter<number>();

  constructor() {
    console.log('Hello ImgTabs Component');
  }

  ngOnInit() {
    this.slideOpts = {
      slidesPerView: this.slidesPerView,
      initialSlide: this.selectedIndex,
    }
  }

  onClick(index) {
    this.selectedIndex = index;
    this.slideClick.emit(index);
  }
}
