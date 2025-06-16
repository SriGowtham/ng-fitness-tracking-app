import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StopTrainingComponent } from './stop-training';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogModule],
  templateUrl: './current-training.html',
  styleUrl: './current-training.css',
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  currentTraining: number = 0;
  private dialog = inject(MatDialog);
  private trainingService = inject(TrainingService)

  ngOnInit() {
    this.startOrResumeTimer()
  }

  startOrResumeTimer(){
    const duration = this.trainingService.getStartedExcercise().duration / 100 * 1000;
    this.currentTraining = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExcercise()
        clearInterval(this.currentTraining);
      }
    }, duration);
  }

  onClick(){
    clearInterval(this.currentTraining)
    const dialogRef = this.dialog.open(StopTrainingComponent , {
      data : { progress: this.progress }
    })

    dialogRef.afterClosed().subscribe((result) => {
     if(result){
      this.trainingService.cancelExcercise(this.progress)
     } else{
      this.startOrResumeTimer()
     }
    })
  }
}
