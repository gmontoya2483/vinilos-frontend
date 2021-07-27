import {Component,  OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MeService} from '../../services/me/me.service';
import {CountriesService} from '../../../shared/services/countries/countries.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styles: [
  ]
})
export class CommunityComponent implements OnInit, OnDestroy {

  communities: {country: {_id: string, name: string}, communities: {_id: string, name: string}[]} = null;
  communityDataForm: FormGroup;
  private usuarioActualizadoSubscription: Subscription;
  public saving = false;


  constructor(private fb: FormBuilder,
              public meService: MeService,
              private countriesService: CountriesService) {

    this.usuarioActualizadoSubscription = this.meService.usuarioActulizadoEvent.subscribe(() => {
      console.log('Se actulizo el usuario');
      this.getMyAvailableCommunities();
      this.crearForm();
    });
  }


  ngOnDestroy(): void {
        this.usuarioActualizadoSubscription.unsubscribe();
    }


  crearForm(){
    let comunidadId = '';
    if (this.meService.me.comunidad){
      comunidadId = this.meService.me.comunidad._id;
    }

    this.communityDataForm = this.fb.group({
      comunidad: [comunidadId]
    });
  }

  ngOnInit(): void {
    this.getMyAvailableCommunities();
    this.crearForm();
  }



  guardarComunidad() {

    if (this.communityDataForm.invalid){
      Object.values( this.communityDataForm.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }


    this.meService.me.comunidad = {_id: this.communityDataForm.value.comunidad};

    this.saving = true;

    this.meService.saveMyCommunity().subscribe((resp: any ) => {
      this.saving = false;
    });

    this.crearForm();

  }


  getMyAvailableCommunities(){
    if (this.meService.me.paisResidencia){
      this.countriesService.getCommunities(this.meService.me.paisResidencia._id).subscribe((communities: any) => {
        this.communities = communities;
      });
    } else {
      this.communities = null;
    }
  }

}
