import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, maxCharacters: number = 100 ): string {

    if (value.length <= maxCharacters  ) {  return value; }

    return value.slice(0, maxCharacters) + '...';
  }

}
