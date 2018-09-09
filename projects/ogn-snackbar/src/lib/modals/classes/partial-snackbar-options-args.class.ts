import { SanckbarPosition } from '../enums/snackbar-position.enum';
import { SnackbarAppearanceEffects } from '../enums/snackbar-appearance-effects.enum';
import { SnackbarIcon } from '../interfaces/snackbar-icon.modal';
import { SnackbarAction } from '../interfaces/snackbar-action.modal';
import { SnackbarOptionsArgs } from '../interfaces/snackbar-options-args.modal';

export class PartialSnackbarOptionsArgs implements Partial<SnackbarOptionsArgs> {
    icon?: SnackbarIcon;
    action?: string | SnackbarAction;
    appearanceEffect?: SnackbarAppearanceEffects;
    position?: SanckbarPosition;
    timeout?: number;
}

