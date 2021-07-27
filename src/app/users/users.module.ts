import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserProfilePhotoComponent } from './components/user-profile-photo/user-profile-photo.component';
import { UserProfileDetailsComponent } from './components/user-profile-details/user-profile-details.component';
import { UserProfileCopiesComponent } from './components/user-profile-copies/user-profile-copies.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, UserProfileComponent, UserProfilePhotoComponent, UserProfileDetailsComponent, UserProfileCopiesComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class UsersModule { }
