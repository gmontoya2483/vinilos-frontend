import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {Usuario} from '../../../../models/ususario.model';
import Swal from 'sweetalert2';
import {UsuarioService} from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styles: [
  ]
})
export class VerificarEmailComponent implements OnInit {

  public token: string;
  public usuario: Usuario;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private usuarioService: UsuarioService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
    });

    this.usuario = authService.decodeJWT(this.token);
    if (!this.usuario){
      Swal.fire({
        title: 'Error con el token',
        text: `No fue posible leer la información del token.`,
        icon: 'error'
      }).then();
      this.router.navigate(['/auth/login']).then();
    }


  }

  ngOnInit(): void {
  }

  validarUsuario() {

    this.usuarioService.validateEmail(this.token).subscribe(
      (resp: any) => {
        this.router.navigate(['/auth/login']).then();
      }
    );

  }
}
