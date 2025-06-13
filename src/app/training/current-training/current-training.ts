import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StopTrainingComponent } from './stop-training';

@Component({
  selector: 'app-current-training',
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogModule],
  templateUrl: './current-training.html',
  styleUrl: './current-training.css',
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  currentTraining: number = 0;
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.currentTraining = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        clearInterval(this.currentTraining);
      }
    }, 1000);
  }

  onClick(){
    clearInterval(this.currentTraining)
    this.dialog.open(StopTrainingComponent)
  }
}
