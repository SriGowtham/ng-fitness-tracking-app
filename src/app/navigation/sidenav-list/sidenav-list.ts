import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidenav-list',
  imports: [MatListModule, RouterLink, MatSidenavModule],
  templateUrl: './sidenav-list.html',
  styleUrl: './sidenav-list.css'
})
export class SidenavList {
  isAuth: boolean = false;
  private authService = inject(AuthService)
  private destroyRef = inject(DestroyRef)
  @Output() sideNavClose =  new EventEmitter();

  onClose(){
    this.sideNavClose.emit()
     this.authService.logout()
  }
  
  ngOnInit(): void {
   this.authService.authDone
   .pipe(takeUntilDestroyed(this.destroyRef))
   .subscribe((result) => {
    this.isAuth = result;
   })
  }
}
