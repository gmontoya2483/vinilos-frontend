import { Injectable } from '@angular/core';
import {Pagination} from '../../../shared/interfaces/pagination.interface';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {throwError} from 'rxjs';
import {VinylErrorResponse, VinylRootResponse, VinylsRootResponse, NewVinyl} from '../../interfaces/vinyl.interface';

@Injectable({
  providedIn: 'root'
})
export class VinylsService {

  // Parametros pagina Vinyls
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

  // Base URL
  private baseUrl = `${environment.vinylsServerUrl}/api/vinyls`;

  constructor( private http: HttpClient,
               private authService: AuthService ) { }

  getAllVinyls(pageSize: number, page: number = 1, search: string = null){

    const url = `${this.baseUrl}`;

    // Obtener el token para posarlo en el header
    const token = this.authService.getToken();
    if (!token){
      return null;
    }
    const headers = new HttpHeaders().set('x-auth-token', token);

    // Parametros de paginación y busqueda
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('pageSize', String(pageSize));
    if (search) {
      params = params.append('search', search);
    }

    return this.http.get(url, {headers, params}).pipe(
      map( (resp: VinylsRootResponse) => {
        return resp.vinyls;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de los vinilos: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })

    );

  }

  saveVinyl({ title, description, genreId, authorId}: NewVinyl) {
    const url = `${this.baseUrl}`;

    // Obtener el token para posarlo en el header
    const token = this.authService.getToken();
    if (!token) {
      return null;
    }
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.post<VinylsRootResponse | VinylErrorResponse>(url, {title, description, genreId, authorId}, {headers}).pipe(
      tap((resp: VinylRootResponse | VinylErrorResponse) => {
        Swal.fire({
          title: 'Nuevo Vinilo',
          text: resp.mensaje,
          icon: 'success'
        }).then();
      }),
      map((resp: VinylRootResponse | VinylErrorResponse) => true),
      catchError(err => {
        Swal.fire({
          title: 'Error',
          text: `No se ha podido agregar el vinilo: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }


  getSingleVinyl(vinylId: string){
    const url = `${this.baseUrl}/${vinylId}`;

    // Obtener el token para posarlo en el header
    const token = this.authService.getToken();
    if (!token){
      return null;
    }
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.get(url, {headers}).pipe(
      map( (resp: VinylRootResponse) => {
        return resp.vinyl;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion del vinilo: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })

    );
  }


}
