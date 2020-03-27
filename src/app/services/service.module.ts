import { NgModule } from '@angular/core';

import { SettingsService, SharedService, SidebarService, UserService, LoginGuardGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
