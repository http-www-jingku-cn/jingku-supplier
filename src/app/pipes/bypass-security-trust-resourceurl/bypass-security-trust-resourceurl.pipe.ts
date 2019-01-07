import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSecurityTrustResourceurl'
})
export class BypassSecurityTrustResourceurlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }
  transform(url: string, args?: any): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
