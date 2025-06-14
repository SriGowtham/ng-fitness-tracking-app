import { Injectable } from '@angular/core';
import { Training } from './training.modal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  excerciseChanged = new Subject<Training>();
  currentExercise: Training;
  excercises: Training[] = [];
  private availableExcercises: Training[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'plank', name: 'Plank', duration: 90, calories: 10 },
    {
      id: 'mountain-climbers',
      name: 'Mountain Climbers',
      duration: 60,
      calories: 12,
    },
    { id: 'jumping-jacks', name: 'Jumping Jacks', duration: 45, calories: 7 },
    { id: 'squats', name: 'Squats', duration: 120, calories: 14 },
    { id: 'lunges', name: 'Lunges', duration: 90, calories: 12 },
    { id: 'high-knees', name: 'High Knees', duration: 60, calories: 10 },
    { id: 'push-ups', name: 'Push-Ups', duration: 45, calories: 9 },
    {
      id: 'bicycle-crunches',
      name: 'Bicycle Crunches',
      duration: 60,
      calories: 11,
    },
    { id: 'jump-squats', name: 'Jump Squats', duration: 30, calories: 8 },
  ];

  getAvailableExcercises() {
    return this.availableExcercises.slice();
  }

  startExcercise(exerciseId: string) {
    this.currentExercise = this.availableExcercises.find(
      (ex) => ex.id === exerciseId
    );
    console.log(this.currentExercise);
    this.excerciseChanged.next({ ...this.currentExercise });
  }

  completeExcercise() {
    this.excercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
    this.currentExercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.excercises.push({
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
}
