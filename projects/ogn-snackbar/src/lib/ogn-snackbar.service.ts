import {
    Injectable,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    Optional
} from '@angular/core';

import { BaseSnackbarOptions } from './modals/classes/base-snackbar-options.class';

import {
    SnackbarOptionsArgs,
    PartialSnackbarOptionsArgs,
    SanckbarPosition,
    SnackbarAppearanceEffects,
} from './modals';

import { SnackbarContentComponent } from './components/snackbar-content/snackbar-content.component';
import { SnackbarWrapperComponent } from './components/snackbar-wrapper/snackbar-wrapper.component';

import { defaultOptions } from './consts/default-options';



@Injectable()
export class OgnSnackbarService {

    private contentViewContainer: ViewContainerRef;
    private defaultOptions: SnackbarOptionsArgs;

    constructor(private factoryResolver: ComponentFactoryResolver, @Optional() userDefault: PartialSnackbarOptionsArgs) {
        this.defaultOptions = this.setDefault(defaultOptions, userDefault as SnackbarOptionsArgs);
        console.log(this.defaultOptions);
        SnackbarWrapperComponent.getSackbarViewInIt().subscribe((viewContainerRef) => {
            this.setContentViewContainerRef(viewContainerRef);
        });
    }

    /** @description
     * this method called **once** whan snackbar-wrapper component emit 'snackbarViewInIt'
     * event, than 'contentViewContainer' member beeing initialize with the 'ng-template'
     * element referance where snackbar-content component will be injected .
     */
    private setContentViewContainerRef(viewContainerRef) {
        this.contentViewContainer = viewContainerRef;
    }

    public showSnackbar(text: string, options?: SnackbarOptionsArgs) {
        try {
            this.contentViewContainer.clear();
        } catch (error) {
            console.log(error);
        }
        console.log(this.defaultOptions);
        const standardizedOptions = new BaseSnackbarOptions(this.defaultOptions, options) as SnackbarOptionsArgs;
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
            || !!options.icon;

        if (!!options.action) {
            if (typeof options.action === 'string') {
                snackbar.instance.action = {
                    name: options.action,
                    handler: undefined
                };
            } else {
                snackbar.instance.action = options.action;
            }

        } else if (!!options.icon) {
            snackbar.instance.icon = options.icon;

        }
    }
    //#endregion

    private setDefault(appDefaultOptions: SnackbarOptionsArgs, userDefaultOptions: SnackbarOptionsArgs): SnackbarOptionsArgs {
        if (!userDefaultOptions) {
            return appDefaultOptions;
        } else {
            return {
                icon: userDefaultOptions.icon || appDefaultOptions.icon,
                action: userDefaultOptions.action || appDefaultOptions.action,
                appearanceEffect: userDefaultOptions.appearanceEffect || appDefaultOptions.appearanceEffect,
                // borderGap?: number;
                position: userDefaultOptions.position || appDefaultOptions.position,
                timeout: userDefaultOptions.timeout || appDefaultOptions.timeout,
            };
        }
    }

}




const defaultSnackbarOptions: SnackbarOptionsArgs = {
    position: SanckbarPosition.BOTTOM,
    timeout: 3000,
};

