import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  AddUserComponent } from './components/add-user/add-user.component';
import {  UserDetailsComponent } from './components/user-details/user-details.component';
import {  UserListComponent } from './components/user-list/user-list.component';
import {  AddDvdComponent } from './components/add-dvd/add-dvd.component';
import { DvdDetailsComponent } from './components/dvd-details/dvd-details.component';
import { DvdListComponent } from './components/dvd-list/dvd-list.component';

@NgModule({
  // A komponensek deklarációja
  declarations: [
    AppComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserListComponent,
    AddDvdComponent,
    DvdDetailsComponent,
    DvdListComponent
  ],
  // Szükséges modulok importálása
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  // Szolgáltatók regisztrálása
  providers: [],
  // Alkalmazás indító komponensének beállítása
  bootstrap: [AppComponent]
})
export class AppModule { }
