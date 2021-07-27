import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  passwordsIguales( pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.get(pass1Name);
      const pass2control = formGroup.get(pass2Name);

      if ( pass1control.value === pass2control.value){
        pass2control.setErrors(null);
      } else {
        pass2control.setErrors({noEsIgual: true});
      }
    };
  }

}
