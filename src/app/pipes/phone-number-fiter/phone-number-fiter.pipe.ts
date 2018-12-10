import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFiter'
})
export class PhoneNumberFiterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      value = value.substring(0,3)+"****"+value.substring(7,11);  
      value.toLowerCase();
    }
    return value
  }

}
