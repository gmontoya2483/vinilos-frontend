import { Injectable } from '@angular/core';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {catchError, map} from 'rxjs/operators';
import {CopiesRootResponse} from '../../interfaces/copy.interface';
import Swal from 'sweetalert2';
import {throwError} from 'rxjs';
import {CopyService} from '../copy/copy.service';

@Injectable({
  providedIn: 'root'
})
export class MeCommunityCopyService {

  // Parametros pagina Books
  private _pageSize = 25;
  private _search = '';
  private _pagination: Pagination = undefined;

  set pageSize( value: number ) {
    this._pageSize = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set search( value: string ) {
    this._search = value;
  }

  get search(): string {
    return this._search;
  }

  set pagination( value: Pagination ) {
    this._pagination = value;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  private baseUrl = `${environment.vinylsServerUrl}/api/me/community/copies`;

  constructor(private copyService: CopyService) { }


  getAllMyCommunityCopies(pageSize: number, page: number = 1, search: string = null) {
    const url = `${this.baseUrl}`;
    return this.copyService.getAllCopies(url, pageSize, page, search);
  }
}
