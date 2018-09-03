import { BaseSnackbarOptions } from './modals/base-snackbar-options.class';
import {
    SnackbarOptionsArgs,
    SanckbarPosition,
    SnackbarAppearanceEffects,
} from './modals';

import {
    Injectable,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Type
} from '@angular/core';

import { SnackbarContentComponent } from './components/snackbar-content/snackbar-content.component';

const DELAY_CLEAR_MS = 700;
@Injectable({ providedIn: 'root' })
export class OgnSnackbarService {

    private contentViewContainer: ViewContainerRef;

    constructor(private factoryResolver: ComponentFactoryResolver) { }

    /** @description
     * this method called from snackbar-wrapper component **only** to initialize
     * 'contentViewContainer' member with the 'ng-template' element referance where
     * snackbar-content component will be injected .
     */
    public setContentViewContainerRef(viewContainerRef) {
        this.contentViewContainer = viewContainerRef;
    }

    public showSnackbar(text: string, options: SnackbarOptionsArgs = defaultSnackbarOptions) {
        this.contentViewContainer.clear();

        const standardizedOptions = new BaseSnackbarOptions(options) as SnackbarOptionsArgs;
        const snackbarComponentRef = this.createComponentRef<SnackbarContentComponent>(
            this.factoryResolver, this.contentViewContainer, SnackbarContentComponent
        );

        if (!!snackbarComponentRef) {
            snackbarComponentRef.instance.onClickActionEvent.subscribe(() => {
                this.setSnackbarHidden(snackbarComponentRef);
            });

            this.setSnackbarParameters(snackbarComponentRef, text, standardizedOptions);
            this.setSnackbarVisibale(snackbarComponentRef);
            snackbarComponentRef.changeDetectorRef.detectChanges();

            // delay the hide by the timeout value
            setTimeout(() => {
                this.setSnackbarHidden(snackbarComponentRef);
                setTimeout(() => {
                    this.contentViewContainer.clear();
                }, DELAY_CLEAR_MS);
            }, standardizedOptions.timeout);
        }
    }

    private createComponentRef<T>(
        factoryResolver: ComponentFactoryResolver, viewRef: ViewContainerRef, component: Type<T>): ComponentRef<T> {
        const factory = factoryResolver.resolveComponentFactory(component);
        const componentRef = viewRef.createComponent(factory);
        return componentRef;
    }


    // #region - visability controllers -
    private setSnackbarVisibale(snackbarComponentRef: ComponentRef<SnackbarContentComponent>) {
        snackbarComponentRef.instance.snackbarShow = true;
    }
    private setSnackbarHidden(snackbarComponentRef: ComponentRef<SnackbarContentComponent>) {
        snackbarComponentRef.instance.snackbarShow = false;
    }
    // #endregion


    // #region - parameters setting -
    private setSnackbarParameters(snackbar: ComponentRef<SnackbarContentComponent>, text: string, options: SnackbarOptionsArgs) {
        this.setEntrancePosition(snackbar, options.position);
        this.setAppearanceEffect(snackbar, options.appearanceEffect);
        this.setSidePart(snackbar, options);
        this.setText(snackbar, text);
    }
    private setText(snackbar: ComponentRef<SnackbarContentComponent>, text: string = '') {
        snackbar.instance.textContent = text;
    }
    private setAppearanceEffect(snackbar: ComponentRef<SnackbarContentComponent>, appearanceEffect: SnackbarAppearanceEffects) {
        snackbar.instance.appearanceEffect = appearanceEffect;
    }
    private setEntrancePosition(snackbar: ComponentRef<SnackbarContentComponent>, position: SanckbarPosition) {
        if (!!position) {
            snackbar.instance.position = position;
        }
    }
    private setSidePart(snackbar: ComponentRef<SnackbarContentComponent>, options: SnackbarOptionsArgs) {
        snackbar.instance.isConteinSidePart
            = !!options.action
            // || !!options.graphicState
            || !!options.matIcon;

        if (!!options.action) {
            if (typeof options.action === 'string') {
                snackbar.instance.action = {
                    name: options.action,
                    handler: undefined
                };
            } else {
                snackbar.instance.action = options.action;
            }

        // } else if (!!options.graphicState) {
        //     snackbar.instance.graphicStateRole = options.graphicState;

        } else if (!!options.matIcon) {
            snackbar.instance.matIcon = options.matIcon;

        }
    }
    //#endregion


}




const defaultSnackbarOptions: SnackbarOptionsArgs = {
    position: SanckbarPosition.BOTTOM,
    timeout: 3000,
    // action: { name: 'Ok', handler: (name, data) => console.log(name, data) },
    // graphicState: SnackbarGraphicState.Success
    // matIcon: MatIconClassics.done
};

