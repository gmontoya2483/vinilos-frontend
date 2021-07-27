import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MiComunidadComponent} from './pages/mi-comunidad/mi-comunidad.component';
import {ComunidadUsersComponent} from './pages/comunidad-users/comunidad-users.component';
import {ComunidadVinylsComponent} from './pages/comunidad-vinyls/comunidad-vinyls.component';


const routes: Routes = [
  {
    path: '',
    component: MiComunidadComponent,
    children: [
      { path: 'users', component: ComunidadUsersComponent },
      { path: 'vinyls', component: ComunidadVinylsComponent },
      { path: '**', redirectTo: '/comunidad/users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiComunidadRoutingModule { }
