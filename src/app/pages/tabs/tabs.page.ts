import { Component, ElementRef } from '@angular/core';
import { injectStyles } from 'shadow-dom-inject-styles';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    /* setTimeout(() => {
      let toolbar = (this.el.nativeElement.querySelector('ion-tabs') as HTMLElement);
      toolbar = toolbar.querySelector('ion-tab-bar');
      // language=CSS
      const styles = `
          ion-tab-button:nth-of-type(2) .ion-icon {
              content: url("../assets/icon/tab-goods.png");
          }
          :host{
          }
      `;
      injectStyles(toolbar, 'ion-tab-button', styles);
    }, 50);
 */
  }
}
