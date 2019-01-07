import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BypassSecurityTrustHtmlPipe } from './bypass-security-trust-html/bypass-security-trust-html.pipe';
import { FindTelePipe } from './find-tele/find-tele.pipe';
import { PhoneNumberFiterPipe } from './phone-number-fiter/phone-number-fiter.pipe';
import { ReversePipe } from './reverse/reverse.pipe';
import { BypassSecurityTrustResourceurlPipe } from './bypass-security-trust-resourceurl/bypass-security-trust-resourceurl.pipe';
import { KeysPipe } from './keys/keys.pipe';

@NgModule({
  declarations: [
    BypassSecurityTrustHtmlPipe,
    FindTelePipe,
    PhoneNumberFiterPipe,
    ReversePipe,
    BypassSecurityTrustResourceurlPipe,
    KeysPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BypassSecurityTrustHtmlPipe,
    FindTelePipe,
    PhoneNumberFiterPipe,
    ReversePipe,
    BypassSecurityTrustResourceurlPipe,
    KeysPipe
  ]
})
export class PipesModule { }
