import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';

// defined all the paths here
const routes: Routes = [
  { path: 'user/add', component: UserUpsertComponent },      // route to add new user
  { path: 'user/edit/:id', component: UserUpsertComponent }, //route to edit existing user
  { path: 'users/list', component: UserListComponent },      // route to see all users
  { path: '', redirectTo: 'users/list', pathMatch: 'full' },  //empty route will redirect to users/list
  { path: '**', redirectTo: 'users/list' }                     // Wildcard route
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModule { }