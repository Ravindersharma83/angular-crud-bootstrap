import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentResponse, StudentService } from '../Service/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  studentId !: string;
  student !: StudentResponse;
  isLoading : boolean = false;
  loadingTitle : string = "";

  constructor(private route:ActivatedRoute, private studentService : StudentService){}
  
  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    this.studentService.getStudent(this.studentId).subscribe({
      next:(res) =>{
        console.log(res);
        this.isLoading = true;
        this.student = res;
        this.isLoading = false;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  updateStudent(){
    var inputData = {
      name: this.student.name,
      course: this.student.course,
      email: this.student.email,
      phone: this.student.phone,
    }

    this.isLoading = true;

    this.studentService.updateStudent(inputData, this.studentId).subscribe({
      next:(res)=>{
        console.log('update---',res);
        
        alert("Student Updated");
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
        
      }
    })
  }
  
}
