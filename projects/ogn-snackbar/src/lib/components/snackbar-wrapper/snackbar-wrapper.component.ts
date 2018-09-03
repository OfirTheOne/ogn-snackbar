import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { OgnSnackbarService } from '../../ogn-snackbar.service';

@Component({
    selector: 'ogn-snackbar-wrapper',
    templateUrl: './snackbar-wrapper.component.html',
    // styleUrls: ['./snackbar.component.scss']
})
export class SnackbarWrapperComponent implements OnInit {

    @ViewChild('snackbar_wrap', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    constructor(private snackbarService: OgnSnackbarService) { }

    ngOnInit(): void {
        this.snackbarService.setContentViewContainerRef(this.viewContainerRef);
    }
}
