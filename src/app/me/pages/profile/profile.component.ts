import { Component, OnInit } from '@angular/core';
import {MeService} from '../../services/me/me.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor(public meService: MeService) {
    this.meService.getMe().subscribe((resp: any ) => {  });
  }

  ngOnInit(): void {
  }

}
