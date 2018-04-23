import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { InitEffect } from './init.effect';
import { FileService } from '../components/file-management/services/getfiles.service';
import { SetArrayEffect } from './setarray.effect';
@NgModule({
    imports: [
        EffectsModule.forRoot([InitEffect, SetArrayEffect])
    ],
    exports: [
        EffectsModule
    ],
    providers: [
       FileService
    ]
})
export class Effects {}
