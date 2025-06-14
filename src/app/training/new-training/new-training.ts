import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TrainingService } from '../training.service';

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
export class NewTrainingComponent {
  private trainingService = inject(TrainingService);

  exercises = this.trainingService.getAvailableExcercises();
  OnTrainingStart(form: NgForm) {
    this.trainingService.startExcercise(form.value.select);
  }
}
