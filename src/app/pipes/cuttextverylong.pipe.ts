import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttextverylong'
})
export class CuttextverylongPipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0,450)+'...';
  }

}
