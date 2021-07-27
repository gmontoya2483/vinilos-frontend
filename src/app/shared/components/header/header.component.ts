import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/services/auth/auth.service';
import {Usuario} from '../../../models/ususario.model';
import {MeService} from '../../../me/services/me/me.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  // usuario: Usuario;

  constructor(private authService: AuthService, public meService: MeService) {
    this.meService.getMe().subscribe((resp: any ) => {  });
  }

  ngOnInit(): void {
  }

  logout() {
    this.meService.me = null;
    this.authService.logout();
  }
}
