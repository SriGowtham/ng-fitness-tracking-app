import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from "./navigation/header/header";
import { SidenavList } from './navigation/sidenav-list/sidenav-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, Header, SidenavList],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected title = 'ng-fitness-tracking-app';
}
