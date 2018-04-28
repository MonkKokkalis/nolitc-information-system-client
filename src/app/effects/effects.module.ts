import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FileService } from '../components/file-management/services/file.service';
import { SignInEffect } from './signin.effect';
import { SetArrayEffect } from './setarray.effect';
import { SetArrayPointerEffect } from './setarraypointer.effect';
import { InitFilesEffect } from './initfiles.effect';
import { AlertVisibleEffect } from './alertvisible.effect';
@NgModule({
    imports: [
        EffectsModule.forRoot([SignInEffect, SetArrayEffect,
            SetArrayPointerEffect, InitFilesEffect, AlertVisibleEffect])
    ],
    exports: [
        EffectsModule
    ],
    providers: [
       FileService
    ]
})
export class Effects {}
