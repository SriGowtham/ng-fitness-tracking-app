import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  imports: [MatDialogModule, MatButtonModule],
  template: `<h2 mat-dialog-title>Do you want to Stop?</h2>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="true">Yes</button>
      <button matButton [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`,
})
export class StopTrainingComponent {}
