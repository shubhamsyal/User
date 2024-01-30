// src/app/user/user.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomColorDirective } from './directives/random-color.directive';
import { CustomtooltipDirective } from './directives/customtooltip.directive';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './pagination/pagination.component';
import { PrimaryNavComponent } from './layout/primary-nav/primary-nav.component';
import { SecondaryNavComponent } from './layout/secondary-nav/secondary-nav.component';

const routes: Routes =[
  { path: 'user/add', component: UserUpsertComponent },
  { path: 'user/edit/:id', component: UserUpsertComponent },
  { path: 'users/list', component: UserListComponent },
  { path: '', redirectTo: 'users/list', pathMatch: 'full' },
]
@NgModule({
  declarations: [AppComponent,UserUpsertComponent, UserListComponent, RandomColorDirective, CustomtooltipDirective, ConfirmationModalComponent, PaginationComponent, PrimaryNavComponent, SecondaryNavComponent,],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
