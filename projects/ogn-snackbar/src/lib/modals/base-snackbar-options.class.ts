import { SanckbarPosition } from './snackbar-position.enum';
import { SnackbarAction } from './snackbar-action.modal';
import { SnackbarAppearanceEffects } from './snackbar-appearance-effects.enum';
import { SnackbarIcon } from './snackbar-icon.modal';
import { SnackbarOptionsArgs } from './snackbar-options-args.modal';

export class BaseSnackbarOptions implements SnackbarOptionsArgs {

    icon?: SnackbarIcon;
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
                };
            } else {
                this.action = {
                    name: action.name,
                    handler: action.handler,
                    textColor: action.textColor || 'white',
                };
            }

        } else if (providedOptions.icon) {
            const icon = providedOptions.icon;
            this.icon = {
                iconName: icon.iconName,
                displayClasses: icon.displayClasses || [],
                extraClasses: icon.extraClasses || undefined,
                iconColor: icon.iconColor || 'white',
            };
        }

        this.position = providedOptions.position || SanckbarPosition.BOTTOM;
        this.appearanceEffect = providedOptions.appearanceEffect || SnackbarAppearanceEffects.SLIDE;
        this.timeout = providedOptions.timeout || 3000;
    }
}


