// src/app/user/user.module.ts

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { UserUpsertComponent } from './user/user-upsert/user-upsert.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomColorDirective } from './directives/random-color.directive';
import { CustomtooltipDirective } from './directives/customtooltip.directive';
import { ConfirmationModalComponent } from './user/common-components/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './user/common-components/pagination/pagination.component';
import { PrimaryNavComponent } from './user/common-components/layout/primary-nav/primary-nav.component';
import { SecondaryNavComponent } from './user/common-components/layout/secondary-nav/secondary-nav.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent,UserUpsertComponent, UserListComponent, RandomColorDirective, CustomtooltipDirective, ConfirmationModalComponent, PaginationComponent, PrimaryNavComponent, SecondaryNavComponent,],
  imports: [
    UserModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    MatProgressBarModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}