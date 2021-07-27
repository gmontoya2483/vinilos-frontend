import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageSizesService {

  private _pageSizes: number[] = [2, 10, 25, 50, 100];

  get pageSizes(): number [] {
    return [... this._pageSizes];
  }

  constructor() { }
}
