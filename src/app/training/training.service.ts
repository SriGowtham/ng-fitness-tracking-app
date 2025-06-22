import { inject, Injectable } from '@angular/core';
import { Training } from './training.modal';
import { map, Subject } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  Firestore,
} from '@angular/fire/firestore';
import { SnackBarService } from '../shared/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  excerciseChanged = new Subject<Training>();
  exercisesChanged = new Subject<Training[]>();
  finshedExcersisesChanged = new Subject<Training[]>();
  currentExercise: Training;
  excercises: Training[] = [];
  availableExcercises: Training[] = [];

  private dB = inject(Firestore);
  private snackBarService = inject(SnackBarService)

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
        this.availableExcercises = training;
        this.exercisesChanged.next([...this.availableExcercises]);
      },
       error: () => {
         this.snackBarService.showSnackBar('Failed to fetch exercise values', null, 3000);
       }
     });

  }

  startExcercise(exerciseId: string) {
    this.currentExercise = this.availableExcercises.find(
      (ex) => ex.id === exerciseId
    );
    this.excerciseChanged.next({ ...this.currentExercise });
  }

  completeExcercise() {
    this.addDataToDatabase({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
    this.currentExercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.addDataToDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.currentExercise = null;
    this.excerciseChanged.next(null);
  }

  getStartedExcercise() {
    return { ...this.currentExercise };
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
    this.finshedExcersisesChanged.next([...exercises]);
  });
}

  private addDataToDatabase(excercise: Training) {
    const finsihedExRef = collection(this.dB, 'finishedExcercise');
    addDoc(finsihedExRef, excercise);
  }
}
