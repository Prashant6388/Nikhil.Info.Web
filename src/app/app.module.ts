import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AssetSearchComponent } from './asset-search/asset-search.component';
import { MatIconModule } from '@angular/material/icon';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VaServersComponent } from './va-servers/va-servers.component';
import { PtNetworkDevicesComponent } from './pt-network-devices/pt-network-devices.component';
import { AppSecComponent } from './app-sec/app-sec.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserAccessFormComponent } from './user-access-form/user-access-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ResetPasswordComponent,
    HeaderComponent,
    SidebarComponent,
    AssetSearchComponent,
    ContactUsComponent,
    VaServersComponent,
    PtNetworkDevicesComponent,
    AppSecComponent,
    UserAccessComponent,
    UserAccessFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    ExportAsModule,
    MatDialogModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [UserAccessFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
