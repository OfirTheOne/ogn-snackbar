import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'ogn-snackbar-wrapper',
    templateUrl: './snackbar-wrapper.component.html',
    // styleUrls: ['./snackbar.component.scss']
})
export class SnackbarWrapperComponent implements OnInit {

    private static snackbarViewInIt: EventEmitter<ViewContainerRef> = undefined;

    @ViewChild('snackbar_wrap', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    /** @description
     * This method will return 'snackbarViewInIt' object only the first time
     * it will be called, any leter call will return undefined.
     * The first time this method will be called it will also initialize the
     * snackbarViewInIt.
     */
    public static getSackbarViewInIt(): EventEmitter<ViewContainerRef> | undefined {
        if (!SnackbarWrapperComponent.snackbarViewInIt) {
            SnackbarWrapperComponent.snackbarViewInIt = new EventEmitter();
            return SnackbarWrapperComponent.snackbarViewInIt;
        } else {
            return undefined;
        }
    }


    constructor() { }

    ngOnInit(): void {
        if (SnackbarWrapperComponent.snackbarViewInIt) {
            SnackbarWrapperComponent.snackbarViewInIt.emit(this.viewContainerRef);
        }
    }


}
