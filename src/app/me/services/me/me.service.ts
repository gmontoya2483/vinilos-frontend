import {EventEmitter, Injectable} from '@angular/core';
import {Usuario} from '../../../models/ususario.model';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {CountriesService} from '../../../shared/services/countries/countries.service';
import {FileUploadService} from '../../../services/file-upload/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private countriesService: CountriesService,
              private fileUploadService: FileUploadService
  ) {
  }

  private url = `${environment.vinylsServerUrl}/api/me`;
  public me: Usuario = null;

  public usuarioActulizadoEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Método del servicio "me" para obtener la información del usuario que esta autenticado.
   */
  public getMe(){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }


    if (this.me){
      return new Observable<true>();
    }

    return this.http.get( this.url, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        this.me = resp.me;
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion del profile: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        this.me = null;
        this.authService.logout();
        this.router.navigate(['/auth/login']).then();
        return throwError(err);
      })
    );
  }

  public SaveMe(){
    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    let body;
    if (this.me.paisResidencia._id === ''){
        body = {
          nombre: this.me.nombre,
          apellido: this.me.apellido
        };
    } else {
      body = {
        nombre: this.me.nombre,
        apellido: this.me.apellido,
        paisResidenciaId: this.me.paisResidencia._id
      };
    }


    return this.http.put( this.url, body, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        this.me = resp.me;
        this.usuarioActulizadoEvent.emit();
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo Guardar la información del profile: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        this.me = null;
        this.router.navigate(['/profile']).then();
        return throwError(err);
      })
    );
  }

  public saveMyCommunity(){
    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    let body;
    if (this.me.comunidad._id === ''){
      body = { };
    } else {
      body = {
        comunidadId: this.me.comunidad._id
      };
    }

    return this.http.put( `${this.url}/community`, body, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        this.me = resp.me;
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo suscribir a la comunidad: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        this.me = null;
        this.router.navigate(['/profile']).then();
        return throwError(err);
      })
    );
  }


  public ChangeMyImage( image: File ){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    this.fileUploadService.updateProfileImg(image, token, `${this.url}/img`).then(
      (resp: any ) => {
        if (!resp){
          Swal.fire({
            title: 'Error',
            text: `Internal Error - No se pudo actualizar la imagen`,
            icon: 'error'
          }).then();
          return;
        }

        if (!resp.ok){
          Swal.fire({
            title: 'Error',
            text: `${resp.mensaje}`,
            icon: 'error'
          }).then();
          return;
        }

        // console.log(resp);
        this.me.img = resp.img;
        localStorage.setItem('token', resp.token);
      }
    );
  }


  getMyCommunityMembers(pageSize: number, page: number = 1, search: string = null){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    if (!this.me.comunidad){
      Swal.fire({
        title: 'Error',
        text: `El usuario no esta registrado en ninguna comunidad.`,
        icon: 'error'
      }).then();
      return null;
    }

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('pageSize', String(pageSize));
    if (search) {
      params = params.append('search', search);
    }

    return this.http.get( `${this.url}/community/members`, {headers: {'x-auth-token': token}, params}).pipe(
      map((resp: any) => {
        return resp.users;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de los miembros de la comunidad: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }


  followUser(user: Usuario){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    if (!this.me.comunidad){
      Swal.fire({
        title: 'Error',
        text: `El usuario no esta registrado en ninguna comunidad.`,
        icon: 'error'
      }).then();
      return null;
    }

    const body = {
      followingUserId: user._id
    };

    return this.http.post( `${this.url}/following`, body, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo solicitar seguir al usuario ${user.nombre} ${user.apellido}: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }


  unFollowUser( user: Usuario){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    return this.http.delete( `${this.url}/following/${user._id}`,  {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo dejar de seguir  al usuario ${user.nombre} ${user.apellido}: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }




  confirmFollower( user: Usuario ){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    return this.http.put( `${this.url}/followers/${user._id}/confirm`, {}, {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo confirmar la solicitud de seguimiento del usuario ${user.nombre} ${user.apellido}: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }

  deleteFollower( user: Usuario ){

    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    return this.http.delete( `${this.url}/followers/${user._id}`,  {headers: {'x-auth-token': token}}).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo eliminar al usuario ${user.nombre} ${user.apellido} de tus seguidores: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );
  }

  getFollowing(pageSize: number, page: number = 1){
    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('pageSize', String(pageSize));

    return this.http.get( `${this.url}/following`, {headers: {'x-auth-token': token}, params}).pipe(
      map((resp: any) => {
        return resp.followings;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de los amigos que sigues: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );

  }

  getFollowers(pageSize: number, page: number = 1){
    const token = this.authService.getToken();
    if (!token){
      this.me = null;
      return null;
    }

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('pageSize', String(pageSize));

    return this.http.get( `${this.url}/followers`, {headers: {'x-auth-token': token}, params}).pipe(
      map((resp: any) => {
        return resp.followers;
      }),
      catchError((err: any) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo obtener informacion de los amigos que te siguen: ${err.error.mensaje}`,
          icon: 'error'
        }).then();
        return throwError(err);
      })
    );

  }

}
