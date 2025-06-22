import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training';
import { PastTrainingComponent } from './past-training/past-training';
import { CurrentTrainingComponent } from './current-training/current-training';
import { Store } from '@ngrx/store';
import * as  fromTraining from './training.reducer';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-training',
  imports: [
    MatTabsModule,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    AsyncPipe
  ],
  templateUrl: './training.html',
  styleUrl: './training.css',
})
export class TrainingComponent implements OnInit {
  currentTraining$: Observable<boolean>
  private destroyRef = inject(DestroyRef);
  private store = inject(Store)

  ngOnInit(): void {
    this.currentTraining$ = this.store.select(fromTraining.getIsTraining).pipe(takeUntilDestroyed(this.destroyRef))
  }
}
