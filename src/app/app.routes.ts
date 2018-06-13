import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/route-guards'

export const ROUTES: Routes = [
  { path: '', component: LoginComponent,
  canActivate: [AuthGuard] },
  { path: 'welcome', component: LoginComponent,
  canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false });