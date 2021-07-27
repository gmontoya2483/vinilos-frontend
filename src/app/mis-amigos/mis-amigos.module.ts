import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisAmigosRoutingModule } from './mis-amigos-routing.module';
import { MisAmigosComponent } from './pages/mis-amigos/mis-amigos.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {AmigosFollowerComponent} from './pages/amigos-follower/amigos-follower.component';
import {AmigosFollowingComponent} from './pages/amigos-following/amigos-following.component';


@NgModule({
  declarations: [
    MisAmigosComponent,
    AmigosFollowerComponent,
    AmigosFollowingComponent
  ],
  imports: [
    CommonModule,
    MisAmigosRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MisAmigosModule { }
