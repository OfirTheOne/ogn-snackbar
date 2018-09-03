export interface SnackbarMatIcon {
    iconName: string;
    iconColor?: string;
    extraClasses?: { [key: string]: boolean };
}

const done = {
    iconName: 'check_circle',
    extraClasses: {
        'done-color': true,
        // 'round-white-bg': true,
    },
};

const fail = {
    iconName: 'cancel',
    extraClasses: {
        'fail-color': true,
        // 'round-white-bg': true,
    },
};

const alert = {
    iconName: 'warning',
    extraClasses: {
        'alert-color': true,
        // 'round-white-bg': true,
    },
};

export const MatIconClassics = {
    done,
    fail,
    alert
};

//
