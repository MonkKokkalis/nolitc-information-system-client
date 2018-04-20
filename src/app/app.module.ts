import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './router/app-routing.module';
import { StoreModule } from '@ngrx/store';

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
@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    FileManagementComponent,
    HomeComponent,
    IconDirective,
    ModalComponent,
    NavComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppState.reducers)
  ],
  providers: [ModalService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
