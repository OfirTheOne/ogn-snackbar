# Ogn Snackbar - Angular Ui Snackbar-Component Service   


## Features

The two main features are :
1. this is an independent ui service - no prerequisites & no dependencies.
2. highly configurable ui component, with simple config options you can controll the position on the  bar, the animation effects, the action / icon that will be presented.

## Setup 

**step 1 -** <br>
In your app.module add :

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


## Doc

### Behavior 
Only one snackbar can be appear only one at a time. 
Whan called a snackbar for appearing while one beeing shown, it will immediately dismissed and the recently called snackbar will appear.

TODO: add SnackbarOptionsArgs doc.

