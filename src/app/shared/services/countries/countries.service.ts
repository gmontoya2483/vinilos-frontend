import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Country} from '../../../models/country.model';
import {throwError} from 'rxjs';
import {AuthService} from '../../../auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url = `${environment.vinylsServerUrl}/api/countries`;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  public getCountries(){

    const token = this.authService.getToken();
    if (!token){
      return null;
    }


    return this.http.get( this.url, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        if (!resp.ok){
          Swal.fire({
            title: 'Error',
            text: `No se pudo obtener informacion de los paises: ${resp.mensaje}`,
            icon: 'error'
          }).then();
          return null;
        }
        return resp.countries;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de los paises: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }

  public getCommunities(countryID: string){
    const token = this.authService.getToken();
    if (!token){
      return null;
    }

    return this.http.get( `${this.url}/${countryID}/communities`, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        if (!resp.ok){
          Swal.fire({
            title: 'Error',
            text: `No se pudo obtener informacion de las comunidades: ${resp.mensaje}`,
            icon: 'error'
          }).then();
          return null;
        }
        return {country: resp.country, communities: resp.communities};
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de las comunidades: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }
}
