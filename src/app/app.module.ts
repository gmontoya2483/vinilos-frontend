import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PagenotfoundComponent } from './shared/pages/pagenotfound/pagenotfound.component';
import { PagesComponent } from './shared/pages/pages/pages.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SideNavBarComponent } from './shared/components/side-nav-bar/side-nav-bar.component';
import {SharedModule} from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagenotfoundComponent,
    PagesComponent,
    FooterComponent,
    SideNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
