import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
const routes: Routes =[
  { path: 'user/add', component: UserUpsertComponent },
  { path: 'user/edit/:id', component: UserUpsertComponent },
  { path: 'users/list', component: UserListComponent },
  { path: '', redirectTo: 'users/list', pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModule { }