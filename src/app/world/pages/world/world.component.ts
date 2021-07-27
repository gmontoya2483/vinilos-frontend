import { Component, OnInit } from '@angular/core';
import {MeService} from '../../../me/services/me/me.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styles: [
  ]
})
export class WorldComponent implements OnInit {

  constructor(public meService: MeService) {
    this.meService.getMe().subscribe((resp: any ) => {  });
  }

  ngOnInit(): void {
  }

}
