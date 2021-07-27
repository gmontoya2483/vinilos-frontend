import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {CambiarPasswordComponent} from './pages/login/cambiar-password/cambiar-password.component';
import {ConfirmarCambioComponent} from './pages/login/cambiar-password/confirmar-cambio.component';
import {RegisterComponent} from './pages/register/register.component';
import {VerificarEmailComponent} from './pages/register/verificar-email/verificar-email.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'cambiarPassword', component: CambiarPasswordComponent },
    { path: 'confirmarCambioPassword', component: ConfirmarCambioComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verificarEmail', component: VerificarEmailComponent},
    { path: '**', redirectTo: 'login'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
