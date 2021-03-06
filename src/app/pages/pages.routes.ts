import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
            {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
            {path: 'graphics', component: GraphicsComponent, data: { titulo: 'Graphics' }},
            {path: 'promises', component: PromisesComponent, data: { titulo: 'Promises' }},
            {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' }},
            {path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }},
            // Mantenimientos
            {path: 'users', component: UsersComponent, data: { titulo: 'Mantenimiento de Usuario' }},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            {path: '*', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
