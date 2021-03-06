import { Component, OnInit } from '@angular/core';

import { OgnSnackbarService } from 'ogn-snackbar';
import { SanckbarPosition, SnackbarAppearanceEffects } from 'ogn-snackbar';

@Component({
    selector: 'app-view-snackbar',
    templateUrl: './view-snackbar.component.html',
    styleUrls: ['./view-snackbar.component.scss']
})
export class ViewSnackbarComponent implements OnInit {

    constructor(private snackbarService: OgnSnackbarService) { }

    ngOnInit() { }

    showSnackbarDefaultOptions() {
        this.snackbarService.showSnackbar('snackbar with default options.');
    }

    showSnackbarTopActionSlide() {
        this.snackbarService.showSnackbar('top snackbar with action and slide effect.', {
            position: SanckbarPosition.TOP,
            appearanceEffect: SnackbarAppearanceEffects.SLIDE,
            timeout: 4000,
            action: { name: 'Ok', handler: (name, data) => console.log(name, data) },
        });
    }
    showSnackbarBottomIconSlide() {
        this.snackbarService.showSnackbar('bottom snackbar with icon and slide effect.', {
            position: SanckbarPosition.BOTTOM,
            appearanceEffect: SnackbarAppearanceEffects.SLIDE,
            timeout: 50000,
            icon: IconClassics.alert
        });
    }


    showSnackbarTopFade() {
        this.snackbarService.showSnackbar('top snackbar with fade effect.', {
            position: SanckbarPosition.TOP,
            appearanceEffect: SnackbarAppearanceEffects.FADE,
            timeout: 4000,
        });
    }
    showSnackbarBottomIconFade() {
        this.snackbarService.showSnackbar('bottom snackbar with icon and slide effect.', {
            position: SanckbarPosition.BOTTOM,
            appearanceEffect: SnackbarAppearanceEffects.FADE,
            timeout: 50000,
            icon: IconClassics.done
        });
    }


    showSnackbarTopActionSlideFade() {
        this.snackbarService.showSnackbar('top snackbar with fade effect.', {
            position: SanckbarPosition.TOP,
            appearanceEffect: SnackbarAppearanceEffects.SLIDE_FADE,
            timeout: 4000,
            action: { name: 'Action', handler: (name, data) => console.log(name, data) },

        });
    }
    showSnackbarBottomIconSlideFade() {
        this.snackbarService.showSnackbar('bottom snackbar with icon and slide effect.', {
            position: SanckbarPosition.BOTTOM,
            appearanceEffect: SnackbarAppearanceEffects.SLIDE_FADE,
            timeout: 50000,
            icon: IconClassics.fail
        });
    }

}


const done = {
    iconName: 'check_circle',
    displayClasses: ['material-icons', 'done-icon'],

};

const fail = {
    iconName: 'cancel',
    displayClasses: ['material-icons', 'fail-icon'],
};

const alert = {
    iconName: 'warning',
    displayClasses: ['material-icons', 'alert-icon'],
};

const IconClassics = {
    done,
    fail,
    alert
};
