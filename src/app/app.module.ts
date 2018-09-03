import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OgnSnackbarModule } from 'ogn-snackbar';

import { AppComponent } from './app.component';
import { ViewSnackbarComponent } from './../pages/view-snackbar/view-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewSnackbarComponent
  ],
  imports: [
    BrowserModule,
    OgnSnackbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
