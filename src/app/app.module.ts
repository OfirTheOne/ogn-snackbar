import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OgnSnackbarModule, SanckbarPosition, SnackbarOptionsArgs } from 'ogn-snackbar';

import { AppComponent } from './app.component';
import { ViewSnackbarComponent } from './../pages/view-snackbar/view-snackbar.component';


const myDefaultOptions: Partial<SnackbarOptionsArgs> = {
  action: 'hello',
  position: SanckbarPosition.TOP
};

@NgModule({
  declarations: [
    AppComponent,
    ViewSnackbarComponent
  ],
  imports: [
    BrowserModule,
    OgnSnackbarModule.forRoot(myDefaultOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
