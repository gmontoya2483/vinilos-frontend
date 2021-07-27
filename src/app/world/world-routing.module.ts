import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorldComponent} from './pages/world/world.component';
import {VinylsComponent} from './pages/vinyls/vinyls.component';
import {AuthorsComponent} from './pages/authors/authors.component';
import {NewAuthorComponent} from './pages/new-author/new-author.component';
import {NewVinylComponent} from './pages/new-vinyl/new-vinyl.component';
import {ViewVinylComponent} from './pages/view-vinyl/view-vinyl.component';
import {ViewAuthorComponent} from './pages/view-author/view-author.component';


const routes: Routes = [
  {
    path: '',
    component: WorldComponent,
    children: [
      { path: 'vinyls', component: VinylsComponent },
      { path: 'vinyls/new', component: NewVinylComponent },
      { path: 'vinyls/view/:vinylId', component: ViewVinylComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'authors/new', component: NewAuthorComponent },
      { path: 'authors/view/:id', component: ViewAuthorComponent },
      { path: 'authors/view/:authorId/vinyls/:vinylId', component: ViewVinylComponent },
      { path: 'copies/view/:copyId/vinyls/:vinylId', component: ViewVinylComponent },
      { path: 'communities/:communityId/copies/view/:copyId/vinyls/:vinylId', component: ViewVinylComponent },
      { path: 'users/:userId/copies/view/:copyId/vinyls/:vinylId', component: ViewVinylComponent },
      { path: 'following/:followingId/copies/view/:copyId/vinyls/:vinylId', component: ViewVinylComponent },
      { path: 'follower/:followerId/copies/view/:copyId/vinyls/:vinylId', component: ViewVinylComponent },
      { path: '**', redirectTo: '/world/vinyls'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldRoutingModule { }
