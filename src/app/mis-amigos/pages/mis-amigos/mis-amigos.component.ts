import { Component, OnInit } from '@angular/core';
import {MeService} from '../../../me/services/me/me.service';

@Component({
  selector: 'app-mis-amigos',
  templateUrl: './mis-amigos.component.html',
  styles: [
  ]
})
export class MisAmigosComponent implements OnInit {

  constructor( public meService: MeService) {
    this.meService.getMe().subscribe((resp: any ) => {  });
  }

  ngOnInit(): void {
  }

}
