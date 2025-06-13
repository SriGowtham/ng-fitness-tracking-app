import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-new-training',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './new-training.html',
  styleUrl: './new-training.css'
})
export class NewTrainingComponent {

  @Output() trainingStart = new EventEmitter();

  OnTrainingStart(){
    this.trainingStart.emit();
  }
}
