import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {
    SnackbarAction,
    SnackbarIcon,
    SnackbarAppearanceEffects
} from '../../modals';

@Component({
    selector: 'ogn-snackbar-content',
    templateUrl: './snackbar-content.component.html',
    styleUrls: ['./snackbar-content.component.scss']
})
export class SnackbarContentComponent implements OnInit {

    private isActionBeenClicked = false;

    @Input() snackbarShow: boolean;
    @Input() position: string;
    @Input() appearanceEffect: SnackbarAppearanceEffects;
    @Input() textContent: string;
    @Input() textColor: string;
    @Input() isConteinSidePart: boolean;

    @Input() action: SnackbarAction;
    @Input() onClickActionEvent: EventEmitter<void>;

    @Input() icon: SnackbarIcon;


    constructor() {
        this.onClickActionEvent = new EventEmitter();
    }

    ngOnInit(): void { }

    public onActionClick($event) {
        if (!!this.action && !!this.action.handler && !this.isActionBeenClicked) {
            this.isActionBeenClicked = true;
            this.action.handler(this.action.name, $event);
            this.onClickActionEvent.next();
        }
    }

    public setSnackbarContentClasses() {
        const contentClasses = {
            'base': true,
            'show': this.snackbarShow,

            'fade': (this.appearanceEffect === SnackbarAppearanceEffects.FADE),
            'pop': (this.appearanceEffect === SnackbarAppearanceEffects.POP),
            'slide': (this.appearanceEffect === SnackbarAppearanceEffects.SLIDE),
            'slide-fade': (this.appearanceEffect === SnackbarAppearanceEffects.SLIDE_FADE),

            'pos-top': (this.position === 'top'),
            'pos-bottom': (this.position === 'bottom'),

            'with-side-part': this.isConteinSidePart
        };
        return contentClasses;
    }

    public setIconClasses(icon: SnackbarIcon) {
        let iconClasses = {};

        const margedClassesArray = [
             ... icon.displayClasses,
             ... (icon.extraClasses || [])
        ];

        if (icon.displayClasses.length > 0) {
            iconClasses = margedClassesArray.reduce<{ [key: string]: boolean }>(
                (classes: { [key: string]: boolean }, iconClass: string) => {
                    classes[iconClass] = true;
                    return classes;
                }, {});
        }
        return iconClasses;
    }

}
