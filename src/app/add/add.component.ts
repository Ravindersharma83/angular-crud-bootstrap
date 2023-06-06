import { Component } from '@angular/core';
import { StudentService } from '../Service/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(private studentService : StudentService){}
  name!:string;
  course!:string;
  email!:string;
  phone!:number | string;
  isLoading : boolean = false;
  loadingTitle : string = 'Loading';

  saveStudent(){
    this.isLoading = true;
    this.loadingTitle = "Saving";
    var inputData = {
      name:this.name,
      course:this.course,
      email:this.email,
      phone:this.phone,
    }

    this.studentService.saveStudent(inputData).subscribe({
      next:(res:any) =>{
        console.log(res);
        this.name = '';
        this.course = '';
        this.email = '';
        this.phone = '';
        this.isLoading = false;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
