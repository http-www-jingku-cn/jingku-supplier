import { Component, OnInit, ElementRef, Renderer, ChangeDetectorRef, Inject, forwardRef } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 's-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  timer: any;

  constructor(
    public element: ElementRef,
    public renderer: Renderer,
    public ref: ChangeDetectorRef,
    @Inject(forwardRef(() => IonContent)) public content: IonContent
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.renderer.setElementClass(this.element.nativeElement, 'fab-button-fadeout', true);
    this.content.scrollEvents = true;
    this.content.ionScroll.subscribe((d) => {
      if (d) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.renderer.setElementClass(this.element.nativeElement, "fab-button-fadeout", true);
        }, 1000);
        this.renderer.setElementClass(this.element.nativeElement, "fab-button-fadein", d.detail.scrollTop >= d.target.clientHeight);
        this.renderer.setElementClass(this.element.nativeElement, "fab-button-fadeout", d.detail.scrollTop < d.target.clientHeight);
      }
    });
  }
  scrollToTop() {
    this.content.scrollToTop(300);
  }

}
