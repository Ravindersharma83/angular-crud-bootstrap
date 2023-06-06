import { Component, OnInit } from '@angular/core';
import { StudentResponse, StudentService } from '../Service/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private studentService : StudentService){}

  students !: StudentResponse[];
  isLoading : boolean = false;

  ngOnInit(){
    this.getStudentLists();
  }

  getStudentLists(){
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next:(res) =>{
        this.students = res;
        this.isLoading = false;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }
}
