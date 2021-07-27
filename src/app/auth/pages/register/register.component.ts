import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidadoresService} from '../../services/validadores/validadores.service';
import {UsuarioService} from '../../services/usuario/usuario.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Usuario} from '../../../models/ususario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .register_container {
        max-width: 600px;
      }
    `
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService,
               private usuarioService: UsuarioService,
               private authService: AuthService,
               private router: Router) {

    if (this.authService.isUserAlreadyLoggedIn()){
      this.router.navigate(['/home']).then();
    }

    this.crearFormulario();

  }

  ngOnInit(): void {
  }

  // Validaciones

  campoNoValido(campo: string){
    if (!this.registroForm.get(campo)){
      return;
    }
    return this.registroForm.get(campo).invalid && this.registroForm.get(campo).touched;
  }

  get password2NoValido(){
    const pass1 = this.registroForm.get('password1').value;
    const pass2 = this.registroForm.get('password2').value;
    return ( pass1 === pass2 ) ? false : true;
  }


  crearFormulario() {
    this.registroForm = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      email  : ['', [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.required]],
      password1: ['', [Validators.required,  Validators.minLength(8), Validators.maxLength(30)]],
      password2: ['', [Validators.required]]
    }, {
      validators: this.validadores.passwordsIguales('password1', 'password2')
    });

  }

  guardarUsuario() {

    if (this.registroForm.invalid){
      Object.values( this.registroForm.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    const usuario = Usuario.createUser({
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      email: this.registroForm.value.email,
      password: this.registroForm.value.password1
    });


    this.usuarioService.createUser( usuario )
      .subscribe(
        (resp: any ) => { this.router.navigate(['/auth/login']).then(r => { return; }); }
      );
  }

}
