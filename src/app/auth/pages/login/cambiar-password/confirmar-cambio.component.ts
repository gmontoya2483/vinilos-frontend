import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidadoresService} from '../../../services/validadores/validadores.service';
import {Usuario} from '../../../../models/ususario.model';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from '../../../services/auth/auth.service';
import {UsuarioService} from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-confirmar-cambio',
  templateUrl: './confirmar-cambio.component.html',
  styles: [
    `
      .login_container {
        max-width: 500px;
      }
    `
  ]
})
export class ConfirmarCambioComponent implements OnInit {

  confirmPasswordForm: FormGroup;
  public token: string;
  public usuario: Usuario;


  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private usuarioService: UsuarioService) {
    this.getTokenParamAndContent();
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  // Validaciones
  campoNoValido(campo: string){
    if (!this.confirmPasswordForm.get(campo)){
      return;
    }
    return this.confirmPasswordForm.get(campo).invalid && this.confirmPasswordForm.get(campo).touched;
  }

  get password2NoValido(){
    const pass1 = this.confirmPasswordForm.get('password1').value;
    const pass2 = this.confirmPasswordForm.get('password2').value;
    return ( pass1 === pass2 ) ? false : true;
  }


  getTokenParamAndContent(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
    });
    this.usuario = this.authService.decodeJWT(this.token);
    if (!this.usuario){
      Swal.fire({
        title: 'Error con el token',
        text: `No fue posible leer la información del token.`,
        icon: 'error'
      }).then();
      this.router.navigate(['/auth/login']).then();
    }
  }

  crearFormulario() {
    this.confirmPasswordForm = this.fb.group({
      email  : [{value: this.usuario.email, disabled: true}],
      password1: ['', [Validators.required,  Validators.minLength(8), Validators.maxLength(30)]],
      password2: ['', [Validators.required]]
    }, {
      validators: this.validadores.passwordsIguales('password1', 'password2')
    });

  }




  CambiarPassword() {

    console.log(this.confirmPasswordForm);

    if (this.confirmPasswordForm.invalid){
      Object.values( this.confirmPasswordForm.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    this.usuarioService.changePassword(this.token, this.confirmPasswordForm.value.password1).subscribe(
      (resp: any) => {
        this.router.navigate(['/auth/login']).then();
      }
    );

  }
}
