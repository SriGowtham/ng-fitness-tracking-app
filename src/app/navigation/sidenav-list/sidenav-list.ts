import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidenav-list',
  imports: [MatListModule, RouterLink, MatSidenavModule, AsyncPipe],
  templateUrl: './sidenav-list.html',
  styleUrl: './sidenav-list.css'
})
export class SidenavList implements OnInit{
  isAuth$ : Observable<boolean>
  private authService = inject(AuthService)
  private store = inject(Store<fromRoot.State>)
  @Output() sideNavClose =  new EventEmitter();

  onClose(){
    this.sideNavClose.emit()
     this.authService.logout()
  }
  
  ngOnInit(): void {
   this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
}
