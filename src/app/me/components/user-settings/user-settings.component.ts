import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Usuario} from '../../../models/ususario.model';
import {Country} from '../../../models/country.model';
import {CountriesService} from '../../../shared/services/countries/countries.service';
import {MeService} from '../../services/me/me.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styles: [
  ]
})
export class UserSettingsComponent implements OnInit {

  userDataForm: FormGroup;
  countries: Country[] = null;
  public saving = false;





  constructor(private fb: FormBuilder,
              public meService: MeService,
              private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.cargarPaises();
    this.crearForm();

  }

  cargarPaises(){
    this.countriesService.getCountries().subscribe((resp: Country[] ) => {
      this.countries = resp;
    });
  }

  crearForm(){
    let paisResidenciaId = '';
    if (this.meService.me.paisResidencia){
      paisResidenciaId = this.meService.me.paisResidencia._id;
    }

    this.userDataForm = this.fb.group({
      nombre  : [this.meService.me.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      apellido: [this.meService.me.apellido, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      email  : [{value: this.meService.me.email, disabled: true}],
      paisResidencia: [paisResidenciaId]
    });
  }

  // Validaciones

  campoNoValido(campo: string){
    if (!this.userDataForm.get(campo)){
      return;
    }
    return this.userDataForm.get(campo).invalid && this.userDataForm.get(campo).touched;
  }



  guardarUsuario(){
    if (this.userDataForm.invalid){
      Object.values( this.userDataForm.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }


    this.meService.me.nombre = this.userDataForm.value.nombre;
    this.meService.me.apellido = this.userDataForm.value.apellido;
    this.meService.me.paisResidencia = {_id: this.userDataForm.value.paisResidencia};

    this.saving = true;

    this.meService.SaveMe().subscribe((resp: any ) => {
      this.saving = false;
    });

    this.crearForm();

  }

}
