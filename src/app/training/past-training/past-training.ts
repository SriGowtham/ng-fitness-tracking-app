import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TrainingService } from '../training.service';
import { Training } from '../training.modal';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  imports: [MatTableModule, CommonModule, MatSortModule, MatInputModule, MatFormFieldModule , MatPaginatorModule],
  templateUrl: './past-training.html',
  styleUrl: './past-training.css'
})
export class PastTrainingComponent implements OnInit, AfterViewInit{
 private trainingService = inject(TrainingService)
 matTableSource = new MatTableDataSource<Training>()
 @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

 displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
 ngOnInit() {
  this.matTableSource.data = this.trainingService.excercises
 }

 ngAfterViewInit(): void {
   this.matTableSource.sort = this.sort;
   this.matTableSource.paginator = this.paginator;
 }
 onFilter(value : string){
  this.matTableSource.filter = value.trim().toLocaleLowerCase()
 }
}
