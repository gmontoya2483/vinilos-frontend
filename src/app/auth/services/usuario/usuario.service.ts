import { Injectable } from '@angular/core';
import {Usuario} from '../../../models/ususario.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.vinylsServerUrl}/api/users`;

  constructor(private http: HttpClient ) {
  }


  public changePassword( token: string, password: string){
    return this.http.put(`${this.url}/changePassword`, { password }, {headers: {'x-auth-token': token}}).pipe(
      map( (resp: any) => {
        Swal.fire({
          title: 'Cambio de contraseña',
          text: resp.mensaje,
          icon: 'success'
        }).then();
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se ha podido cambiar la contraseña: ${err.error.mensaje}`,
          icon: 'error'
        }).then();

        return throwError(err);
      })
    );
  }


  public requestChangePassword(email: string){
    Swal.fire({
      title: 'Espere',
      text: 'Enviando solicitud de cambio de contraseña',
      icon: 'info',
      allowOutsideClick: false
    }).then(r => {return; });
    Swal.showLoading();

    return this.http.post(`${this.url}/changePassword`, { email }).pipe(
      map( (resp: any) => {
        Swal.fire({
          title: 'Solicitud de cambio de contraseña',
          text: resp.mensaje,
          icon: 'success'
        }).then();
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se ha enviado la solicitud de cambio de contraseña: ${err.error.mensaje}`,
          icon: 'error'
        }).then();

        return throwError(err);
      })
    );
  }


 public validateEmail(token: string){
    return this.http.put(`${this.url}/validateEmail`, { }, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Email Validado',
          text: resp.mensaje,
          icon: 'success'
        }).then();
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo Validar el correo electrónico: ${err.error.mensaje}`,
          icon: 'error'
        }).then();

        return throwError(err);

      })

    );
 }

  public createUser( usuario: Usuario ){
    Swal.fire({
       title: 'Espere',
       text: 'Creando Usuario',
       icon: 'info',
       allowOutsideClick: false
     }).then(r => {return; });
    Swal.showLoading();

    const nuevoUsusario = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      password: usuario.password,
      email: usuario.email
    };

    // @ts-ignore
    return this.http.post(this.url, nuevoUsusario ).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Usuario creado',
          text: resp.mensaje,
          icon: 'success'
        }).then();
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear el Usuario: ${err.error.mensaje}`,
          icon: 'error'
        }).then();

        return throwError(err);

      })
    );
  }
}
