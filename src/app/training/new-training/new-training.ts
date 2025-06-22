import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TrainingService } from '../training.service';
import { Training } from '../training.modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer'
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-new-training',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './new-training.html',
  styleUrl: './new-training.css',
})
export class NewTrainingComponent implements OnInit {
  private trainingService = inject(TrainingService);
  exercises$ : Observable<Training[]>
  private store = inject(Store<fromTraining.State>)

  ngOnInit(): void {
    this.trainingService.fetchAvailableExcercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExcersises)
  }
  OnTrainingStart(form: NgForm) {
    this.trainingService.startExcercise(form.value.select);
  }
}
