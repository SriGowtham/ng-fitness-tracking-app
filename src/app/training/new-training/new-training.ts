import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-new-training',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './new-training.html',
  styleUrl: './new-training.css'
})
export class NewTrainingComponent {

}
