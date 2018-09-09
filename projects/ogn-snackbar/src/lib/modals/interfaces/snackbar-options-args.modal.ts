
import { SnackbarIcon } from '../interfaces/snackbar-icon.modal';
import { SnackbarAction } from '../interfaces/snackbar-action.modal';
import { SnackbarAppearanceEffects } from '../enums/snackbar-appearance-effects.enum';
import { SanckbarPosition } from '../enums/snackbar-position.enum';


// export enum SnackbarGraphicState {
//     Load = 'Load',
//     Success = 'Success',
//     Fail = 'Fail',
//     Alert = 'Alert',
// }

export interface SnackbarOptionsArgs {
    icon?: SnackbarIcon;
    // matIcon?: SnackbarMatIcon;
    action?: string | SnackbarAction;

    appearanceEffect?: SnackbarAppearanceEffects; // the effect of which the bar will appeare.
    borderGap?: number; // the gap betwean the border position (e.g top, bottom) to the bar, in pixel unit.
    position: SanckbarPosition; // the postion f the bar, top, bottom or middle.
    timeout: number; // the amount in milisec the bar will be shown (3-10)
}

