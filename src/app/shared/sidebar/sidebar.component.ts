import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _sidebar: SidebarService,
               public userService: UserService) { }

  ngOnInit(): void {
    // console.log(this._sidebar.menu[0].submenu.length);
  }

}
