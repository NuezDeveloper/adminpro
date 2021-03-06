import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: User

  constructor( public _sidebar: SidebarService,
               public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    // console.log(this._sidebar.menu[0].submenu.length);
  }

}
