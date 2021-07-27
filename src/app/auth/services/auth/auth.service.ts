import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../../models/ususario.model';
import Swal from 'sweetalert2';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import jwtDecode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private url = `${environment.vinylsServerUrl}/api/auth`;

  constructor( private http: HttpClient, private router: Router) {
    console.log('Serivio auth listo');
  }


  public  getToken(): string | null {
    const token = localStorage.getItem('token') || null;
    if (!token){
      Swal.fire({
        title: 'Error',
        text: `Token inválido o inexistente`,
        icon: 'error'
      }).then();
      this.router.navigate(['/auth/login']).then();
      return null;
    }
    return token;
  }

  public decodeJWT(token: string){
    try{
      return jwtDecode(token);
    }catch {
      console.error('Token inválido');
      return null;
    }
  }


  public getAuthenticatedUser() {

    const token = this.getToken();
    if (!token){
      return null;
    }

    const tokenUser = this.decodeJWT(token);
    if (!tokenUser){
      return null;
    }

    return  Usuario.createUser(tokenUser);
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']).then();

  }


  public login( email: string, password: string , recordar: boolean = false ){
    if (recordar ){
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }

    // @ts-ignore
    return this.http.post(this.url, { email, password } ).pipe(
      map( (resp: any ) => {
        const usuario = this.decodeJWT(resp.token);
        if (!usuario){
          return false;
        }

        localStorage.setItem('token', resp.token);
        return true;
        }
      ),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo autenticar el usuario: ${err.error.mensaje}`,
          icon: 'error'
        }).then();

        return throwError(err);
      })
    );

  }


  isUserAlreadyLoggedIn(): boolean {
    const token = localStorage.getItem('token') || null;
    return !!token;
  }
}
