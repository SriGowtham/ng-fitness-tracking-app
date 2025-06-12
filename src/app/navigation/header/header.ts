import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  @Output() sideNavtoggle = new EventEmitter();

  onToggle() {
    this.sideNavtoggle.emit()
  }
}
