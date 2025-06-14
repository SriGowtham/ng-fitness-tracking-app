import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  isAuth : boolean = false;
  private authService = inject(AuthService)
  private destroyRef = inject(DestroyRef)
  @Output() sideNavtoggle = new EventEmitter();

  onToggle() {
    this.sideNavtoggle.emit()
  }

  ngOnInit() {
   const authSub = this.authService.authDone.subscribe((result) => {
     this.isAuth = result
   })
   this.destroyRef.onDestroy(() => {
    authSub.unsubscribe()
   })
  }
  onLogout(){
    this.authService.logout()
  }
}
