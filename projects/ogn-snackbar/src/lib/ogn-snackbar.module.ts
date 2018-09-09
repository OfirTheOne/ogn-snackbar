import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SnackbarWrapperComponent } from './components/snackbar-wrapper/snackbar-wrapper.component';
import { SnackbarContentComponent } from './components/snackbar-content/snackbar-content.component';

import { OgnSnackbarService } from './ogn-snackbar.service';
import { PartialSnackbarOptionsArgs, SnackbarOptionsArgs } from './modals';


@NgModule({
    imports: [CommonModule],
    declarations: [SnackbarWrapperComponent, SnackbarContentComponent],
    exports: [SnackbarWrapperComponent],
    providers: [OgnSnackbarService],
    entryComponents: [SnackbarWrapperComponent, SnackbarContentComponent]
}) export class OgnSnackbarModule {

    constructor(@Optional() @SkipSelf() parentModule: OgnSnackbarModule) {
        if (parentModule) {
            throw new Error(
                'OgnSnackbarModule is already loaded. Import it in the AppModule only.');
        }
    }

    static forRoot(options: Partial<SnackbarOptionsArgs>): ModuleWithProviders {
        return {
            ngModule: OgnSnackbarModule,
            providers: [{
                provide: PartialSnackbarOptionsArgs,
                useValue: (options as PartialSnackbarOptionsArgs)
            }]
        };
    }
}
