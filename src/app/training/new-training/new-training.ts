import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TrainingService } from '../training.service';
import { Firestore, FirestoreModule, collection , collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-new-training',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    FirestoreModule,
    AsyncPipe,
  ],
  templateUrl: './new-training.html',
  styleUrl: './new-training.css',
})
export class NewTrainingComponent implements OnInit {
  private trainingService = inject(TrainingService);
  private dB = inject(Firestore);

  exercises$: Observable<any[]>

  ngOnInit(): void {
  const exercisesRef = collection(this.dB, 'availableExcercises');
  this.exercises$ = collectionData(exercisesRef, { idField: 'id' }) as Observable<any[]>;

  }
  OnTrainingStart(form: NgForm) {
    this.trainingService.startExcercise(form.value.select);
  }
}
