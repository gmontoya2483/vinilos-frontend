import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MisAmigosComponent} from './pages/mis-amigos/mis-amigos.component';
import {AmigosFollowingComponent} from './pages/amigos-following/amigos-following.component';
import {AmigosFollowerComponent} from './pages/amigos-follower/amigos-follower.component';


const routes: Routes = [
  {
    path: '',
    component: MisAmigosComponent,
    children: [
      { path: 'following', component: AmigosFollowingComponent},
      { path: 'followers', component: AmigosFollowerComponent},
      { path: '**', redirectTo: '/amigos/following'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisAmigosRoutingModule { }
