import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttextlong'
})
export class CuttextlongPipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0,200)+'...';
  }

}
