import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FileManagementComponent } from './components/file-management/file-management.component';
import { RoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AlertComponent } from './components/alert/alert.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FileManagementComponent,
    HomeComponent,
    PaginationComponent,
    AlertComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
