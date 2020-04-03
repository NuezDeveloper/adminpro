import { NgModule } from '@angular/core';

import { SettingsService, SharedService, SidebarService, UserService, UploadFileService, LoginGuardGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

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
    UploadFileService,
    LoginGuardGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
