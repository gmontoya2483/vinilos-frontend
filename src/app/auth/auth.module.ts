import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CambiarPasswordComponent} from './pages/login/cambiar-password/cambiar-password.component';
import {ConfirmarCambioComponent} from './pages/login/cambiar-password/confirmar-cambio.component';
import { RegisterComponent } from './pages/register/register.component';
import {VerificarEmailComponent} from './pages/register/verificar-email/verificar-email.component';


@NgModule({
  declarations: [
    LoginComponent,
    CambiarPasswordComponent,
    ConfirmarCambioComponent,
    RegisterComponent,
    VerificarEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
