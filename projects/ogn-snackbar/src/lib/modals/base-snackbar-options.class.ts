import { SanckbarPosition } from './snackbar-position.enum';
import { SnackbarAction } from './snackbar-action.modal';
import { SnackbarAppearanceEffects } from './snackbar-appearance-effects.enum';
import { SnackbarMatIcon } from './snackbar-mat-icon.modal';
import { SnackbarOptionsArgs } from './snackbar-options-args.modal';

export class BaseSnackbarOptions implements SnackbarOptionsArgs {

    matIcon?: SnackbarMatIcon;
    action?: SnackbarAction;
    appearanceEffect?: SnackbarAppearanceEffects;
    position: SanckbarPosition;
    timeout: number;

    constructor(providedOptions: SnackbarOptionsArgs) {
        this.margeOption(providedOptions);
    }

    private margeOption(providedOptions: SnackbarOptionsArgs) {
        if (providedOptions.action) {
            const action = providedOptions.action;
            if (typeof action === 'string') {
                this.action = {
                    name: action,
                    handler: undefined,
                    textColor: 'white',
                    // desmissOnlyOnClick: false,
                };
            } else {
                this.action = {
                    name: action.name,
                    handler: action.handler,
                    textColor: action.textColor || 'white',
                    // desmissOnlyOnClick: action.desmissOnlyOnClick || false,
                };
            }

        } else if (providedOptions.matIcon) {
            const matIcon = providedOptions.matIcon;
            this.matIcon = {
                iconName: matIcon.iconName,
                iconColor: matIcon.iconColor || 'white',
                extraClasses: matIcon.extraClasses || undefined
            };
        }

        this.position = providedOptions.position || SanckbarPosition.BOTTOM;
        this.appearanceEffect = providedOptions.appearanceEffect || SnackbarAppearanceEffects.SLIDE;
        this.timeout = providedOptions.timeout || 3000;
    }
}


