import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddDvdComponent } from './components/add-dvd/add-dvd.component';
import { DvdDetailsComponent } from './components/dvd-details/dvd-details.component';
import { DvdListComponent } from './components/dvd-list/dvd-list.component';

const routes: Routes = [
  // Alapértelmezett útvonal átirányítása a 'Users' útvonalra
  { path: '', redirectTo: 'Users', pathMatch: 'full' },

  // 'Users' útvonal és a hozzá tartozó komponens
  { path: 'Users', component: UserListComponent },

  // 'Users/:id' útvonal és a hozzá tartozó komponens
  { path: 'Users/:id', component: UserDetailsComponent },

  // 'add' útvonal és a hozzá tartozó komponens
  { path: 'add', component: AddUserComponent },

  { path: 'Dvds', component: AddDvdComponent },

  { path: 'Dvds/:id', component: DvdDetailsComponent },

  { path: 'dvd-list', component: DvdListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
