import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training';
import { PastTrainingComponent } from './past-training/past-training';
import { CurrentTrainingComponent } from './current-training/current-training';
import { TrainingService } from './training.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-training',
  imports: [
    MatTabsModule,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
  ],
  templateUrl: './training.html',
  styleUrl: './training.css',
})
export class TrainingComponent implements OnInit {
  currentTraining: boolean = false;
  private trainingService = inject(TrainingService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.trainingService.excerciseChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ex) =>
        ex ? (this.currentTraining = true) : (this.currentTraining = false)
      );
  }
}
