import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './pages/users/users.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {path: 'profile/:userId', component: UserProfileComponent},
      {path: 'following/:followingId', component: UserProfileComponent},
      {path: 'follower/:followerId', component: UserProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
