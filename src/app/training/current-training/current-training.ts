import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
  @Output() trainingComplete = new EventEmitter()

  ngOnInit() {
    this.startOrResumeTimer()
  }

  startOrResumeTimer(){
    this.currentTraining = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        clearInterval(this.currentTraining);
      }
    }, 1000);
  }

  onClick(){
    clearInterval(this.currentTraining)
    const dialogRef = this.dialog.open(StopTrainingComponent , {
      data : { progress: this.progress }
    })

    dialogRef.afterClosed().subscribe((result) => {
     console.log(result)
     if(result){
       this.trainingComplete.emit()
     } else{
      this.startOrResumeTimer()
     }
    })
  }
}
