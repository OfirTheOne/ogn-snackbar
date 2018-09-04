
# Angular 6 Ui Snackbar-Component Service   

**At this point compatible with Angular v6**


## Features

The two main features are :
1. this is an independent ui service - no prerequisites & no dependencies.
2. highly configurable ui component, with simple config options you can controll the position on the  bar, the animation effects, the action / icon that will be presented.

## Setup 

**step 1 -** <br>
In your app.module add :

    import { OgnSnackbarModule } from 'ogn-snackbar';

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

    import { OgnSnackbarService } from 'ogn-snackbar';
    ...
    constructor(private snackbarService: OgnSnackbarService) { }
    
to show the snackbar call the method 
`this.snackbarService.showSnackbar(text: string, options?: SnackbarOptionsArgs)`

### Example

    import { Component, OnInit } from '@angular/core';

    import { 
      OgnSnackbarService, 
      SanckbarPosition,
      SnackbarAppearanceEffects 
    } from 'ogn-snackbar';

    @Component({
        selector: 'app-view-snackbar',
        templateUrl: './view-snackbar.component.html',
        styleUrls: ['./view-snackbar.component.scss']
    })
    export class ViewSnackbarComponent implements OnInit {

        constructor(private snackbarService: OgnSnackbarService) { }

        ngOnInit() { }
         
        /** here we calling the snackbar to be position on top, with 'Ok' as 
         *  an action next to the text (with handle param as a callback),
         *  for 4 sec and entering/exiting with slide effect.
         */ 
        showSnackbar() {
            this.snackbarService.showSnackbar('Hello for snackbar view !', {
                position: SanckbarPosition.TOP,
                appearanceEffect: SnackbarAppearanceEffects.SLIDE,
                timeout: 4000,
                action: { name: 'Ok', handler: (name, data) => console.log(name, data) },
            });
        }


## Doc

### Behavior 
A snackbar can appear only one at a time. 
Whan called a snackbar for appearing while one is beeing shown, it will immediately dismissed and the recently called snackbar will appear.

TODO: add SnackbarOptionsArgs doc.

