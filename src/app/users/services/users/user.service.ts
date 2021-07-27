import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {throwError} from 'rxjs';
import {UserRootResponse} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.vinylsServerUrl}/api/users`;

  constructor(private http: HttpClient,
              private authService: AuthService ) { }



  getUserProfile(userId: string) {

    const url = `${ this.url }/${ userId }`;

    // Obtener el token para posarlo en el header
    const token = this.authService.getToken();
    if (!token){
      return null;
    }
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.get(url, { headers }).pipe(
      map( (resp: UserRootResponse) => {
        return resp.usuario;
      }),
      catchError(( err: any ) => {

        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion del usuario: ${err.error.mensaje}`,
          icon: 'error'
        }).then();

        return throwError(err);
      })
    );




  }





}
