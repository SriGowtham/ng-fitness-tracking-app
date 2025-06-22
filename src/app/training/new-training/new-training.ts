import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TrainingService } from '../training.service';
import { Training } from '../training.modal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-new-training',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './new-training.html',
  styleUrl: './new-training.css',
})
export class NewTrainingComponent implements OnInit {
  private trainingService = inject(TrainingService);
  private destoryRef = inject(DestroyRef)
  exercises : Training[] = []

  ngOnInit(): void {
    this.trainingService.fetchAvailableExcercises();
    this.trainingService.exercisesChanged
    .pipe(takeUntilDestroyed(this.destoryRef))
    .subscribe((ex) => {
      this.exercises = ex
    })
  }
  OnTrainingStart(form: NgForm) {
    this.trainingService.startExcercise(form.value.select);
  }
}
