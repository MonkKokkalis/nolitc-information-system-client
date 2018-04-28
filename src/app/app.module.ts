import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './router/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Effects } from './effects/effects.module';

import { environment } from '../environments/environment';
import { AlertComponent } from './components/alert/alert.component';
import { AppComponent } from './app.component';
import { FileManagementComponent } from './components/file-management/file-management.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthenticationService } from './services/authentication.service';
import { IconDirective } from './directives/icon.directive';
import * as AppState from './store/reducers/app.reducer';
import { UploadWindowComponent } from './components/upload-window/upload-window.component';
@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    FileManagementComponent,
    HomeComponent,
    IconDirective,
    ModalComponent,
    NavComponent,
    PaginationComponent,
    UploadWindowComponent
  ],
  imports: [
    BrowserModule,
    Effects,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppState.reducers),
    StoreDevtoolsModule.instrument({
        maxAge: 10,
        logOnly: environment.production
    })
  ],
  providers: [ModalService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
