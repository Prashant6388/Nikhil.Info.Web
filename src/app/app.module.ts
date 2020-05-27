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
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserAccessFormComponent } from './user-access-form/user-access-form.component';
import { EndpointDialogComponent } from './endpoint-dialog/endpoint-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatSelectModule } from '@angular/material/select';
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
    EndpointDialogComponent,    
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
    MatDialogModule,
    ExportAsModule,
    MatTooltipModule,
    CommonModule,
    MatSelectModule,
    NgCircleProgressModule.forRoot({})
  ],
  entryComponents: [
    EndpointDialogComponent, UserAccessFormComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
