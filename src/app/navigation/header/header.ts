import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, RouterLink, MatButtonModule , AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  isAuth$ : Observable<boolean>;
  private authService = inject(AuthService)
  private store = inject(Store<fromRoot.State>)
  @Output() sideNavtoggle = new EventEmitter();

  onToggle() {
    this.sideNavtoggle.emit()
  }

  ngOnInit() {
   this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
  onLogout(){
    this.authService.logout()
  }
}
