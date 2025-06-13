import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  imports: [MatDialogModule, MatButtonModule],
  template: `<h2 mat-dialog-title>Do you want to Stop?</h2>
    <mat-dialog-content>
      <p>You have got {{dataPassed.progress}}%</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="true">Yes</button>
      <button matButton [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`,
})
export class StopTrainingComponent {
  dataPassed = inject(MAT_DIALOG_DATA);
}
