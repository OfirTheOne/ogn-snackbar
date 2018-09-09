import {
    SnackbarAppearanceEffects,
    SanckbarPosition,
    SnackbarOptionsArgs
} from '../modals';

const DEFAULT_TIMEOUT = 3000;

export const defaultOptions: SnackbarOptionsArgs = {

    icon: undefined,
    action: undefined,
    appearanceEffect: SnackbarAppearanceEffects.SLIDE,
    // borderGap?: number;
    position: SanckbarPosition.BOTTOM,
    timeout: DEFAULT_TIMEOUT,
};
