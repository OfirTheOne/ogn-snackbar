# Ogn Snackbar - Angular Ui Snackbar-Component Service   

## Setup 

**step 1 -** <br>
in your app.module do :

    import { OgnSnackbarModule } from 'snackbar';

    @NgModule({
      declarations: [ ... ],
      imports: [
        BrowserModule,
        OgnSnackbarModule
      ], 
        ...
    })


**step 2 -** <br> 
in app.component.html (at the top) do :

    <ogn-snackbar-wrapper></ogn-snackbar-wrapper>


## Usage

To use the snackbar service, in your application components, import and inject the service like any other service.<br>
to show the snackbar call the method `showSnackbar(text: string, options?: SnackbarOptionsArgs)`

TODO: add SnackbarOptionsArgs doc.

