import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training';
import { PastTrainingComponent } from "./past-training/past-training";
import { CurrentTrainingComponent } from "./current-training/current-training";

@Component({
  selector: 'app-training',
  imports: [MatTabsModule, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent],
  templateUrl: './training.html',
  styleUrl: './training.css'
})
export class TrainingComponent {
  currentTraining: boolean = false
}
