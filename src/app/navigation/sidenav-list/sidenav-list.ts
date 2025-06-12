import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  imports: [MatListModule, RouterLink, MatButtonModule, MatSidenavModule],
  templateUrl: './sidenav-list.html',
  styleUrl: './sidenav-list.css'
})
export class SidenavList {

  @Output() sideNavClose =  new EventEmitter();

  onClose(){
    this.sideNavClose.emit()
  }
}
