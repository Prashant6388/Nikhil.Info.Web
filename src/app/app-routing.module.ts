import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSecComponent } from './app-sec/app-sec.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AssetSearchComponent } from './asset-search/asset-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PtNetworkDevicesComponent } from './pt-network-devices/pt-network-devices.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { VaServersComponent } from './va-servers/va-servers.component';


const routes: Routes = [
  {
    path: 'app-sec', component: AppSecComponent
  },
  {
    path: 'asset-search', component: AssetSearchComponent
  },
  {
    path: 'contact-us', component: ContactUsComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'pt-network-devices', component: PtNetworkDevicesComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'user-access', component: UserAccessComponent
  },
  {
    path: 'va-servers', component: VaServersComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '**', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
