import { Component, ElementRef } from '@angular/core';
import { injectStyles } from 'shadow-dom-inject-styles';
import { NavController } from '@ionic/angular';
import { ChatService } from 'src/app/providers/webim/chat.service';
import { StartupService } from 'src/app/providers/startup.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private el: ElementRef,
    public chatServ: ChatService,
    public startServ: StartupService,
  ) {
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
    }, 50); */
  }
}
