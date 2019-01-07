import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length != undefined) {
      return value;
    }
    let keys = [];
    for (let key in value) {
      keys.push(value[key]);
    }
    return keys;
  }

}
