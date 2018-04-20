import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { FileManagementComponent } from '../components/file-management/file-management.component';
import { RouteGuard } from './route-guard';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'file-management', component: FileManagementComponent, canActivate: [RouteGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        RouteGuard
    ]
})

export class RoutingModule {}
