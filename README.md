
# Angular 6 Ui Snackbar-Component Service   

**At this point compatible with Angular v6**


## Features

The two main features are :
1. This is an independent ui service - no prerequisites & no dependencies.
2. Highly configurable ui component, with simple config options you can controll the position on the  bar, the animation effects, the action / icon that will be presented.


## Usage

To use the snackbar service, in your application components, import and inject the service like any other service.<br>

    import { OgnSnackbarService } from 'ogn-snackbar';
    ...
    constructor(private snackbarService: OgnSnackbarService) { }
    
To show the snackbar call the method<br> 

    this.snackbarService.showSnackbar(text: string, options?: SnackbarOptionsArgs)

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
          this.snackbarService.showSnackbar('Hello from snackbar view !', {
            position: SanckbarPosition.TOP,
            appearanceEffect: SnackbarAppearanceEffects.SLIDE,
            timeout: 4000,
            action: { 
              name: 'Ok', 
              handler: (name, data) => console.log(name, data) 
            },
          });
        }
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
In app.component.html (at the top) do :

    <ogn-snackbar-wrapper></ogn-snackbar-wrapper>


## Documentation


### Behavior 
A snackbar can appear only one at a time. 
Whan called a snackbar for appearing while one is beeing shown, it will immediately dismissed and the recently called snackbar will appear.



### Core Objects

#### <b>*SnackbarOptionsArgs*</b> 

* Object scheme :  

      SnackbarOptionsArgs {
        /** a none clickable icon, position at the right side of the bar, 
         *  (same position as an action).
         */
        matIcon?: SnackbarIcon;
         
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

* Used only as a parameter for `showSnackbar` method


#### <b>*SnackbarAction*</b> 

* Object scheme :  

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
* Used only as a property in `SnackbarOptionsArgs` object.
* Action have priority over icon - if Both action and an icon are defined 
  on `SnackbarOptionsArgs` object the icon will be ignored.
 
 
 #### <b>*SnackbarIcon*</b> 

* Object scheme :  

      SnackbarIcon {
        /** accessibility purposes - use as the value of the 'aria-labelledby' 
         *  attribute that wrap the icon element.
         */
        iconName: string;
        
        /** array of the css classes responsible for displaying the icon.
         *  e.g : 
         *  using Matirial Icons we difine this class on the global style file,
         *    material-icons.alert-icon:before { 
         *      content: "warning"; 
         *      color: #FDD835; 
         *    }
         *  and the 'displayClasses' will be ['material-icons', 'alert-icon'].
         */
        displayClasses: string[];
        
        /** array of extra css classes that will be attach to the icon element.
         *  the resone for this property is to seperte the classes that difine 
         *  the content and color (the classes that responsabale for the icon 
         *  being what it is) from the less major classes.
         *  (you can ignore this property if you want)
         */        
        extraClasses?: string[];
        
        iconColor?: string; // [will be supported in the near future !]
      }
* Used only as a property in `SnackbarOptionsArgs` object.
* Action have priority over icon - if Both action and an icon are defined 
  on `SnackbarOptionsArgs` object the icon will be ignored.
 
      
      
### Default Options Configuration
There are default options' values defained, thay will be used in a case `showSnackbar` method will receive no options parameter.

* Default Options :

      {
        matIcon: undefined;
        action: undefined;
        appearanceEffect: SnackbarAppearanceEffects.SLIDE;
        // borderGap: undefined; // [will be supported in the near future !]
        position: SanckbarPosition.BOTTOM;
        timeout: 3000; 
      }

You can override those options be providing your own options object using `OgnSnackbarModule.forRoot()` in app.module.<br>
for example : <br>

    ...
    import { OgnSnackbarModule, SanckbarPosition, SnackbarOptionsArgs } from 'ogn-snackbar';

    const myDefaultOptions: Partial<SnackbarOptionsArgs> = {
      action: 'Ok',
      position: SanckbarPosition.TOP
    };
    
    @NgModule({
      declarations: [ ... ],
      imports: [
        BrowserModule,
        OgnSnackbarModule.forRoot(myDefaultOptions)
      ],
      ...
    })
    
now the default options will marge to 

    {
      matIcon: undefined;
      action: 'Ok';
      appearanceEffect: SnackbarAppearanceEffects.SLIDE;
      // borderGap: undefined; 
      position: SanckbarPosition.TOP;
      timeout: 3000; 
    }
      
That mean that every time you will call `showSnackbar` method with no options, the bar will slide from the top for 3 sec, with 'Ok' action aside. <br>
But be aware that with those default options in palce, any time you will not state action or an icon in the options object you provide `showSnackbar` method, the bar will default to the 'Ok' action stated in `myDefaultOptions` object.



### Notes 
* If you calling the `showSnackbar` method for app.component.ts (your root app ts file) make sure to call it after the view is initialized (not from the `constructor` or `ngOnInit`, for example).



### Background
[material.io - snackbars](https://material.io/design/components/snackbars.html) <br>
I'v tried to follow (not strictly) along the line Matirial.io weaved, and their best practice for implementing a snackbar, as far as design and user experience.


