import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldRoutingModule } from './world-routing.module';
import { WorldComponent } from './pages/world/world.component';
import { VinylsComponent } from './pages/vinyls/vinyls.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewAuthorComponent } from './pages/new-author/new-author.component';
import { NewVinylComponent } from './pages/new-vinyl/new-vinyl.component';
import { ViewVinylComponent } from './pages/view-vinyl/view-vinyl.component';
import {SharedModule} from '../shared/shared.module';
import { ViewAuthorComponent } from './pages/view-author/view-author.component';
import { AuthorVinylsComponent } from './components/author-vinyls/author-vinyls.component';


@NgModule({
  declarations: [
    WorldComponent,
    VinylsComponent,
    AuthorsComponent,
    NewAuthorComponent,
    NewVinylComponent,
    ViewVinylComponent,
    ViewAuthorComponent,
    AuthorVinylsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WorldRoutingModule,
        SharedModule
    ]
})
export class WorldModule { }
