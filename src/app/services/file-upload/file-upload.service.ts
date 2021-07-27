import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private authService: AuthService) { }

  async updateProfileImg(
    file: File,
    token: string,
    url: string
  ){

    try{

      const formData = new FormData();
      formData.append('imagen', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-auth-token': token || ''
        },
        body: formData
      });

      return await resp.json();

    }catch (error){
      console.log(error);
      return false;
    }
  }
}
