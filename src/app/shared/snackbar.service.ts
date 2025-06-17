import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({providedIn: 'root'})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  showSnackBar(message : string, action: any , duration: number) {
    this.snackBar.open(message, action , {
        duration: duration
    })
  }
}