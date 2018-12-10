import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findTele'
})
export class FindTelePipe implements PipeTransform {

  transform(value: string, args?: any) {
    let phoneRex = /(1[3-8]\d{9})(?!@|.*?\1)/gi;
    let result = value.replace(phoneRex, '<a href="tel:$&" style="color:#3d7cca">$&</a>')
    return result;
  }
}
