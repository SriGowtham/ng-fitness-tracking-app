import { inject, Injectable } from '@angular/core';
import { Training } from './training.modal';
import { map, take } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  Firestore,
} from '@angular/fire/firestore';
import { SnackBarService } from '../shared/snackbar.service';
import { Store } from '@ngrx/store';
import { SetAvailableExcersises, SetFinsihedExcersises, SetStartExcersises, SetStopExcersises } from './training.actions';
import * as fromTraining from './training.reducer'

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  availableExcercises: Training[] = [];

  private dB = inject(Firestore);
  private snackBarService = inject(SnackBarService)
  private store = inject(Store)

  fetchAvailableExcercises() {
    return collectionSnapshots(collection(this.dB, 'availableExcercises'))
      .pipe(
        map((docs) =>
          docs.map((doc) => {
            const data = doc.data() as Omit<Training, 'id'>;
            return { id: doc.id, ...data };
          })
        )
      )
      .subscribe({
        next: (training: Training[]) => {
          this.store.dispatch(new SetAvailableExcersises(training))
        
      },
       error: () => {
         this.snackBarService.showSnackBar('Failed to fetch exercise values', null, 3000);
       }
     });

  }

  startExcercise(exerciseId: string) {
    this.store.dispatch(new SetStartExcersises(exerciseId))
  }

  completeExcercise() {
    this.store.select(fromTraining.getActiveExcersise).pipe(take(1)).subscribe((ex) => {
    this.addDataToDatabase({
      ...ex,
      date: new Date(),
      state: 'completed',
    });
  })
    this.store.dispatch(new SetStopExcersises())
  }

  cancelExcercise(progress: number) {
    this.store.select(fromTraining.getActiveExcersise).pipe(take(1)).subscribe((ex) => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
    })
   this.store.dispatch(new SetStopExcersises())
  }

 fetchCompletedorCancelledExcercises() {
  const fetchRef = collection(this.dB, 'finishedExcercise');

  collectionData(fetchRef, { idField: 'id' }).pipe(
    map((data: any[]) =>
      data.map(item => ({
        ...item,
        date: item.date?.toDate?.() ?? null
      })) as Training[]
    )
  ).subscribe((exercises: Training[]) => {
    this.store.dispatch(new SetFinsihedExcersises(exercises))
  });
}

  private addDataToDatabase(excercise: Training) {
    const finsihedExRef = collection(this.dB, 'finishedExcercise');
    addDoc(finsihedExRef, excercise);
  }
}
