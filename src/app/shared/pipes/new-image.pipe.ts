import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'newImage'
})
export class NewImagePipe implements PipeTransform {

  private baseUrl = `${environment.vinylsServerUrl}/api/img`;

  transform(value: string | null, type: 'users'|'books'): string {
    if (!value){
      return `${this.baseUrl}/${type}/no-img`;
    }
    return `${this.baseUrl}/${type}/${value}`;
  }

}
