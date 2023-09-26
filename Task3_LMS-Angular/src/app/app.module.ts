import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewbooksComponent } from './viewbooks/viewbooks.component';
import { AddbookComponent } from './addbook/addbook.component';
import { ViewpatronComponent } from './viewpatron/viewpatron.component';
// import { AddpatronComponent } from './addpatron/addpatron.component';
import { BorrowbookComponent } from './borrowbook/borrowbook.component';
import { ReturnbookComponent } from './returnbook/returnbook.component';
// import { BookServiceService } from './book-service.service';
import { ReactiveFormsModule } from '@angular/forms';
// import { PatronService } from './patron.service';
import { LoginComponent } from './login/login.component';
import { PatronloginComponent } from './patronlogin/patronlogin.component';
import { RegistrationComponent } from './registration/registration.component';
import { PatronRegistrationComponent } from './patron-registration/patron-registration.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewbooksComponent,
    AddbookComponent,
    ViewpatronComponent,
    // AddpatronComponent,
    BorrowbookComponent,
    ReturnbookComponent,
    LoginComponent,
    PatronloginComponent,
    RegistrationComponent,
    PatronRegistrationComponent,
    EditProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  // providers: [BookServiceService,PatronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
