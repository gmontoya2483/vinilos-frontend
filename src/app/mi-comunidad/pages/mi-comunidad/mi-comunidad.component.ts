import { Component, OnInit } from '@angular/core';
import {MeService} from '../../../me/services/me/me.service';

@Component({
  selector: 'app-mi-comunidad',
  templateUrl: './mi-comunidad.component.html',
  styles: [
  ]
})
export class MiComunidadComponent implements OnInit {

  constructor(public meService: MeService) {
    this.meService.getMe().subscribe((resp: any ) => {  });
  }

  ngOnInit(): void {
  }

}
