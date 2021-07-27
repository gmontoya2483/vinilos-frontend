import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../../services/usuario/usuario.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styles: [
    `
      .login_container {
        max-width: 500px;
      }
    `
  ]
})
export class CambiarPasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private authService: AuthService,
              private router: Router) {

    if (this.authService.isUserAlreadyLoggedIn()){
      this.router.navigate(['/dashboard']).then();
    }

    this.crearFormulario();
  }



  ngOnInit(): void {
  }

  campoNoValido(campo: string){
    if (!this.changePasswordForm.get(campo)){
      return;
    }
    return this.changePasswordForm.get(campo).invalid && this.changePasswordForm.get(campo).touched;
  }

  RegistrarCambioContrasena() {
    if (this.changePasswordForm.invalid){
      Object.values( this.changePasswordForm.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    this.usuarioService.requestChangePassword(this.changePasswordForm.value.email).subscribe(
      (resp: any) => {
        this.router.navigate(['/auth/login']).then();

      }
    );

  }

  private crearFormulario() {
    this.changePasswordForm = this.fb.group({
      email  : ['', [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.required]]
    });

  }


}
