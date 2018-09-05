
# Angular 6 Ui Snackbar-Component Service   

**At this point compatible with Angular v6**


## Features

The two main features are :
1. this is an independent ui service - no prerequisites & no dependencies.
2. highly configurable ui component, with simple config options you can controll the position on the  bar, the animation effects, the action / icon that will be presented.


## Usage

To use the snackbar service, in your application components, import and inject the service like any other service.<br>

    import { OgnSnackbarService } from 'ogn-snackbar';
    ...
    constructor(private snackbarService: OgnSnackbarService) { }
    
to show the snackbar call the method<br> 
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


## Doc


### Behavior 
A snackbar can appear only one at a time. 
Whan called a snackbar for appearing while one is beeing shown, it will immediately dismissed and the recently called snackbar will appear.

TODO: add SnackbarOptionsArgs doc.


### Core Objects

<br>
<b>*SnackbarOptionsArgs*</b> 
* object scheme :  

      SnackbarOptionsArgs {
        matIcon?: SnackbarMatIcon;
         
        /** a clickable text at the right side of the bar, if a callback
         *  is not needed than a simple string would suffice, else
         *  use a SnackbarAction
         */
        action?: string | SnackbarAction;
         
        /** the effect/animation of which the bar will appeare.
         *  can be fade, slide, fade-slide and pop 
         *  [pop option will be supported in the near future !]
         */
        appearanceEffect?: SnackbarAppearanceEffects;
        
        borderGap?: number; // [will be supported in the near future !]
        
        /** the postion/location of the bar, top or bottom.
         */
        position: SanckbarPosition; 
        
        /** the amount in milisec the bar will be shown.
         */
        timeout: number; 
      }

* used only as a parameter for showSnackbar method

<br>
<b>*SnackbarAction*</b> 
* object scheme :  

      SnackbarAction {
          /** the action name, the text that will be placed at the right 
           *  side of the bar.
           */
          name: string;
          
          /** the callback that will be called whan the action been clicked,
           *  it received the name of the action, and the event object.
           */          
          handler: (action: string, $event: Event) => void;
                 
          textColor?: string;  // [will be supported in the near future !]
      }
* used only as a property in SnackbarOptionsArgs object.
* action have priority over icon - if Both action and an icon are defined 
  on SnackbarOptionsArgs object the icon will be ignored.
      
      
### Notes 
* if you calling the `showSnackbar` method for app.component.ts (your root app ts file) make sure to call it after the view is initialized (not from the constructor or ngOnit, for example).


### Background
[material.io - snackbars](https://material.io/design/components/snackbars.html) <br>
I'v tried to follow (not strictly) along the line Matirial.io weaved, and their best practice for implementing a snackbar, as far as design and user experience.


