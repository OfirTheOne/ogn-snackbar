import { SanckbarPosition } from '../enums/snackbar-position.enum';
import { SnackbarAppearanceEffects } from '../enums/snackbar-appearance-effects.enum';
import { SnackbarIcon } from '../interfaces/snackbar-icon.modal';
import { SnackbarAction } from '../interfaces/snackbar-action.modal';
import { SnackbarOptionsArgs } from '../interfaces/snackbar-options-args.modal';

export class BaseSnackbarOptions implements SnackbarOptionsArgs {

    icon?: SnackbarIcon;
    action?: SnackbarAction;
    appearanceEffect?: SnackbarAppearanceEffects;
    position: SanckbarPosition;
    timeout: number;

    constructor(defaultOptions: SnackbarOptionsArgs, providedOptions: SnackbarOptionsArgs) {
        this.margeOption(defaultOptions, providedOptions);
    }

    private margeOption(defaultOptions: SnackbarOptionsArgs, providedOptions: SnackbarOptionsArgs) {
        function getIfDefine<T, K extends  keyof T>(prior: T, later: T, property: K)  {
            return (prior ? (prior[property] || later[property]) : later[property]);
        }

        if (providedOptions) {
            this.setActionOrIcon(providedOptions);
        }
        if (!this.action && !this.icon) {
            this.setActionOrIcon(defaultOptions);
        }

        this.position = getIfDefine<SnackbarOptionsArgs, 'position'>(providedOptions, defaultOptions, `position`);
        this.appearanceEffect = getIfDefine<SnackbarOptionsArgs, 'appearanceEffect'>(providedOptions, defaultOptions, `appearanceEffect`);
        this.timeout = getIfDefine<SnackbarOptionsArgs, 'timeout'>(providedOptions, defaultOptions, `timeout`);
    }

    private setActionOrIcon(options: SnackbarOptionsArgs) {
        if (options.action) {
            const action = options.action;
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

        } else if (options.icon) {
            const icon = options.icon;
            this.icon = {
                iconName: icon.iconName,
                displayClasses: icon.displayClasses || [],
                extraClasses: icon.extraClasses || undefined,
                iconColor: icon.iconColor || 'white',
            };
        }

    }
}

