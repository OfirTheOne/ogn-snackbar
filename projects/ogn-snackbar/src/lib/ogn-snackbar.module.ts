import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackbarWrapperComponent } from './components/snackbar-wrapper/snackbar-wrapper.component';
import { SnackbarContentComponent } from './components/snackbar-content/snackbar-content.component';

// import { SnackbarService } from './snackbar.service';


@NgModule({
    imports: [CommonModule],
    declarations: [SnackbarWrapperComponent, SnackbarContentComponent],
    // providers: [SnackbarService],
    exports: [SnackbarWrapperComponent],
    entryComponents: [SnackbarWrapperComponent, SnackbarContentComponent]
}) export class OgnSnackbarModule { }
