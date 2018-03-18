import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FileManagementComponent } from './pages/file-management/file-management.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'file-management', component: FileManagementComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule {}
