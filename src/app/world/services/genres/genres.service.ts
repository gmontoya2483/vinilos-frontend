import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {catchError, map} from 'rxjs/operators';
import {VinylsRootResponse} from '../../interfaces/vinyl.interface';
import Swal from 'sweetalert2';
import {throwError} from 'rxjs';
import {Genre, GenreRootResponse, ShortGenre} from '../../interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  // Base URL
  private baseUrl = `${environment.vinylsServerUrl}/api/genres`;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getGenresList(){

    const url = `${this.baseUrl}`;

    // Obtener el token para posarlo en el header
    const token = this.authService.getToken();
    if (!token){
      return null;
    }
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.get(url, { headers }).pipe(
      map( (resp: GenreRootResponse): ShortGenre[] => {
        return resp.genres.map( (genre: Genre) => {
          return {_id: genre._id, name: genre.name};
        });
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de los Géneros: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }

}
